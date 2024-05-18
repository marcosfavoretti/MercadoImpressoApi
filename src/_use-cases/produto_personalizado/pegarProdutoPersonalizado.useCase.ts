import {  Injectable } from "@nestjs/common";
import { Produto_personalizado } from "src/_domain/entities/produtopersonalizado.entity";
import { Usuario } from "src/_domain/entities/usuario.entity";
import { ProdutoPersonalizadoRepository } from "src/_framework/ORM/Produto_Personalizado.repository";

@Injectable()
export class PegaProdutoPersonalizadoUseCase{
    constructor(
        private produtoRep: ProdutoPersonalizadoRepository,
        ){}
    
        async execute(usuario: Usuario): Promise<Produto_personalizado>{
            return await this.produtoRep.getProdByUser(usuario)
        }
}