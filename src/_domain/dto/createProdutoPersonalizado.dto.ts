import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";
import { Usuario } from "../entities/usuario.entity";

export class CreateProdutoPersonalizadoDto {
    @ApiProperty()
    @IsString()
    nome: string;

    @ApiProperty()
    @IsString()
    area_superficie: number;

    @ApiProperty()
    @IsString()
    volume: number;

    @ApiProperty()
    @IsString()
    modelo3d: string;

    @ApiProperty()
    userId: Usuario;
}