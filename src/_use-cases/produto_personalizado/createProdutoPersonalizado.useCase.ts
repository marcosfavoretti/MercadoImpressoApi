import {  Injectable } from "@nestjs/common";
import { CreateProdutoPersonalizadoDto } from "src/_domain/dto/createProdutoPersonalizado.dto";
import { CreateUserDto } from "src/_domain/dto/createUser.dto";
import { Produto_personalizado } from "src/_domain/entities/produtopersonalizado.entity";
import { Usuario } from "src/_domain/entities/usuario.entity";
import { ProdutoPersonalizadoRepository } from "src/_framework/ORM/Produto_Personalizado.repository";
import { UsuarioRepository } from "src/_framework/ORM/Usuario.repository";
import { StlMeasuresService } from "src/_infrastructure/stl-measures-service/stlmeasures.service";

@Injectable()
export class CrateProdutoPersonalizadoUseCase{
    constructor(
        private produtoRep: ProdutoPersonalizadoRepository,
        private stlMeasures: StlMeasuresService
        ){}
    
        async create(uploadfile: Express.Multer.File, user: Usuario){
        const produtoPersonalizado = new Produto_personalizado()
        const volume = this.stlMeasures.getArea(uploadfile.path)
        const area = this.stlMeasures.getVolume(uploadfile.path)
        Object.assign(produtoPersonalizado, {
            UserId: user,
            area_superficie: area,
            modelo3d: uploadfile.path,
            nome: uploadfile.originalname,
            volume: volume,
        })
        await this.produtoRep.create({
            ...produtoPersonalizado
        })
    }
}