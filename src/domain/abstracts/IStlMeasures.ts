export abstract class IStlMeasures{
    abstract getVolume(filePath: string, desnity?:number): number
    abstract getArea(filePath: string, desnity?:number): number
    abstract getWeight(filePath: string, desnity?:number): number
}