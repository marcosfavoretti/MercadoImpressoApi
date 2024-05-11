import { Injectable } from '@nestjs/common';
import { Produto_personalizado } from 'src/produto_personalizado/Entities/Produto_personalizado.entity';
import { CustomProdutoPersonalizadoDto } from 'src/produto_personalizado/dto/customProdutoPersonalizadoDto';
const NodeStl = require("node-stl");

@Injectable()
export class PriceCalculatorService {

    calculatePrice(custom: CustomProdutoPersonalizadoDto, projeto: Produto_personalizado){
        console.log(custom, projeto)


        const stlInfos = new NodeStl(projeto.modelo3d, { density: custom.material.densidade})
        const precoFilamento = this.calcPrecoFilamento2gramas(custom.material.preco)
        const fullPeso = stlInfos.weight
        const fullvolume = this.cm3tom3(stlInfos.volume)
        const realVolume = this.calculatevolumeReal(fullvolume, custom.preenchimento)
        const realPeso = this.calcnovoPeso(fullPeso, fullvolume, realVolume)
        const precoFinal = realPeso * precoFilamento
        return precoFinal
    }

    private tempoXgasto(){
        
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
