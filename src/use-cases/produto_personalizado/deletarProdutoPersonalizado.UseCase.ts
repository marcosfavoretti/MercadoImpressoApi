import {  Injectable } from "@nestjs/common";
import { Produto_personalizado } from "src/domain/entities/produtopersonalizado.entity";
import { Usuario } from "src/domain/entities/usuario.entity";
import { ProdutoPersonalizadoRepository } from "src/framework/ORM/Produto_Personalizado.repository";

@Injectable()
export class DeletarProdutoPersonalizadoUseCase{
    constructor(
        private produtoRep: ProdutoPersonalizadoRepository,
        ){}
    
        async delete(usuario: Usuario){
            return await this.produtoRep.deleteByUser(usuario)
        }
}