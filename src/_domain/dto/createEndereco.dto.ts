import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateEnderecoDto {
    @ApiProperty()
    @IsString()
    bairro: string
    @ApiProperty()
    @IsString()
    rua: string
    @ApiProperty()
    @IsNumber()
    numero: number
}