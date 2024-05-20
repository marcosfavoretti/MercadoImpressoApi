import { Injectable } from '@nestjs/common';
import { IStlMeasures } from 'src/domain/abstracts/IStlMeasures';
const NodeStl = require("node-stl");


@Injectable()
export class StlMeasuresService implements IStlMeasures {
    defautl_density:1.04

    getArea(filepath: string, desnity?:number): number {
        const area = new NodeStl(filepath, { density: desnity ||this.defautl_density }).area;
        return area
    }

    getVolume(filepath: string, desnity?:number): number {
        const volume = new NodeStl(filepath, { density:desnity || this.defautl_density }).volume;
        return volume
    }

    getWeight(filepath: string, desnity?:number):number{
        const weight = new NodeStl(filepath,{ density:desnity || this.defautl_density }).weight;
        return weight
    }

    //poderia deixa mais abstrato jogando um IStlMeasure e cada uma dessa medida viraria um arquivo
}