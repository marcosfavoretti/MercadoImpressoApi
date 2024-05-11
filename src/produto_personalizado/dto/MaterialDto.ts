import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class MaterialDto{
    @IsString()
    @ApiProperty()
    id: number
    @IsString()
    @ApiProperty()
    nome: string
    @IsString()
    @ApiProperty()
    disponivel: boolean
    @IsString()
    @ApiProperty()
    cor: string
    @IsString()
    @ApiProperty()
    preco: number
    @ApiProperty()
    @IsString()
    densidade: number
}