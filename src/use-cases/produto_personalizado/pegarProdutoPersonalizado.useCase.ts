import {  Injectable } from "@nestjs/common";
import * as path from "path";
import { Produto_personalizado } from "src/domain/entities/produtopersonalizado.entity";
import { Usuario } from "src/domain/entities/usuario.entity";
import { ProdutoPersonalizadoRepository } from "src/framework/ORM/Produto_Personalizado.repository";

@Injectable()
export class PegaProdutoPersonalizadoUseCase{
    constructor(
        private produtoRep: ProdutoPersonalizadoRepository,
        ){}
    
        async execute(usuario: Usuario): Promise<Produto_personalizado>{
            const produto =  await this.produtoRep.getProdByUser(usuario)
            Object.assign(produto, {remote_url:  "https://mercadoimpressoapi.azurewebsites.net/"+path.basename(produto.modelo3d)})
            return produto
        }
}