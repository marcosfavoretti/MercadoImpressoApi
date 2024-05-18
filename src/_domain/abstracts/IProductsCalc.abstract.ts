import { CustomProdutoPersonalizadoDto } from "../dto/updateProdutoPersonalizado.dot";
import { Produto_personalizado } from "../entities/produtopersonalizado.entity";

export abstract class IProductsPersonalizadoCalc{
    abstract calculate(product : Produto_personalizado , custom?: CustomProdutoPersonalizadoDto):number
}