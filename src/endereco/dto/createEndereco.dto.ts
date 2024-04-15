import { IsNumber, IsString } from "class-validator";

export class CreateEnderecoDto {
    @IsString()
    bairro: string
    @IsString()
    rua: string
    @IsNumber()
    numero: number
}