import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AuthDto {
    @ApiProperty()
    @IsString()
    nome: string
    @ApiProperty()
    @IsString()
    senha: string

}