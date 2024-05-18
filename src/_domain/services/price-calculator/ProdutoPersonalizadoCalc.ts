import { Injectable } from '@nestjs/common';
import { IProductsPersonalizadoCalc } from 'src/_domain/abstracts/IProductsCalc.abstract';
import { CustomProdutoPersonalizadoDto } from 'src/_domain/dto/updateProdutoPersonalizado.dot';
import { Produto_personalizado } from 'src/_domain/entities/produtopersonalizado.entity';
import { ProdutoPersonalizadoRepository } from 'src/_framework/ORM/Produto_Personalizado.repository';
import { StlMeasuresService } from 'src/_infrastructure/stl-measures-service/stlmeasures.service';

@Injectable()
export class ProdutoPersonalizadoCalc implements IProductsPersonalizadoCalc{
    //calculadora apenas calcula o preço de consumo de material, nao esta cobrando taxa de mao de obra nem gastos terceiros no valor
    constructor(
        private stlService: StlMeasuresService
    ){}

    calculate(product: Produto_personalizado, custom: CustomProdutoPersonalizadoDto): number {
        const precoFilamento = this.calcPrecoFilamento2gramas(custom.material.preco)
        const fullPeso = this.stlService.getWeight(product.modelo3d,custom.material.densidade)
        const fullVolumeinCM3 = this.stlService.getVolume(product.modelo3d, custom.material.densidade)
        const fullvolumeinM3 = this.cm3tom3(fullVolumeinCM3)
        const realVolume = this.calculatevolumeReal(fullvolumeinM3, custom.preenchimento)
        const realPeso = this.calcnovoPeso(fullPeso, fullvolumeinM3, realVolume)
        const precoFinal = realPeso * precoFilamento
        return precoFinal
    }

    private cm3tom3(volume : number): number{
        return volume/1000000
    }         

    private calcPrecoFilamento2gramas(preco_per_kg: number){
        return preco_per_kg / 1000
    }
    
    private calculatevolumeReal(volumeTotal: number, infill: number){
        return volumeTotal * (infill/100)
    }
    
    private calcnovoPeso(totalPeso: number, totalVolume: number, parcialVolume: number){
        return (totalPeso  * parcialVolume )/ totalVolume
    }
}