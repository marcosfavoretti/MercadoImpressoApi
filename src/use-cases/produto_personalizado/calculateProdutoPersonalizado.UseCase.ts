import {  Injectable } from "@nestjs/common";
import { CustomProdutoPersonalizadoDto } from "src/domain/dto/updateProdutoPersonalizado.dot";
import { Produto_personalizado } from "src/domain/entities/produtopersonalizado.entity";
import { Usuario } from "src/domain/entities/usuario.entity";
import { ProdutoPersonalizadoCalc } from "src/domain/services/price-calculator/ProdutoPersonalizadoCalc";
import { ProdutoPersonalizadoRepository } from "src/framework/ORM/Produto_Personalizado.repository";

@Injectable()
export class CalculateProdutoPersonalizadoUseCase{
    constructor(
        private produtoRep: ProdutoPersonalizadoRepository,
        private produtoPersonalizadoCalc: ProdutoPersonalizadoCalc
        ){}
    
        async calc(user: Usuario, custom: CustomProdutoPersonalizadoDto){
            const  currentProduct = await this.produtoRep.getProdByUser(user)
            return this.produtoPersonalizadoCalc.calculate(currentProduct, custom)
        }
}