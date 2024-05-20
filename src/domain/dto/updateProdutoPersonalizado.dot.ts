import {  ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString, ValidateNested } from "class-validator"
import { Type } from "class-transformer"
import { MaterialDto } from "./material.dto"

export class CustomProdutoPersonalizadoDto {
    @ApiProperty()
    @ValidateNested({message: 'material deve ser um objeto valido'})
    @Type(() => MaterialDto)
    material?: MaterialDto
    @ApiProperty()
    @IsNumber()
    preenchimento: number
    @ApiProperty()
    @IsNumber()
    camada: number
    @ApiProperty()
    @IsString()
    notas?: string | undefined
}