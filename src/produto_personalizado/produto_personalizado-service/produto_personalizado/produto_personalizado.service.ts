import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto_personalizado } from 'src/produto_personalizado/Entities/Produto_personalizado.entity';
import { CreateProdutoPersonalizadoDto } from 'src/produto_personalizado/dto/createProdutoPersonalizadoDto';
import { Usuario } from 'src/usuario/Entities/Usuario.entity';
import { Repository } from 'typeorm';
const NodeStl = require("node-stl");
const path = require('path')
@Injectable()
export class ProdutoPersonalizadoService {
    private desnity = 1.04
    constructor(@InjectRepository(Produto_personalizado) private produtoPersonalizado: Repository<Produto_personalizado>) { }

    async createProdutoPersonalizado(createprodutopersonalizado: CreateProdutoPersonalizadoDto) {
        await this.produtoPersonalizado.insert({
            nome: createprodutopersonalizado.nome,
            modelo3d: createprodutopersonalizado.modelo3d,
            area_superficie: createprodutopersonalizado.area_superficie,
            volume: createprodutopersonalizado.volume,
            UserId: createprodutopersonalizado.userId // Supondo que 'UserId' é o nome da coluna que armazena o ID do usuário na tabela Produto_personalizado
        });
    }

    async getModelobyUser(usuario: Usuario): Promise<Produto_personalizado | undefined> {
        const modelo = await this.produtoPersonalizado.findOne({
            where: {
                UserId: usuario
            }
        })
        if (!modelo) return modelo
        modelo['remote_url'] = this.setRemoteUrl(modelo.modelo3d)
        return modelo

    }

    setRemoteUrl(localpath: string) {
        const projectFile = path.basename(localpath)
        return `https://mercadoimpressoapi.azurewebsites.net/${projectFile}`
    }

    async deleteModelobyUser(usuario: Usuario) {
        await this.produtoPersonalizado.delete({
            UserId: usuario
        })
    }


    getProdutoArea(file: Express.Multer.File): number {

        const area = new NodeStl(file.path, { density: 1.04 }).area;
        return area
    }

    getProdutoVolume(file: Express.Multer.File): number {
        const volume = new NodeStl(file.path, { density: 1.04 }).volume;
        return volume
    }

}
