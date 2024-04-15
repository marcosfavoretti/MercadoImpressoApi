import { IsEmail, IsString, ValidateNested } from "class-validator"
import { Type } from "class-transformer"
import { CreateEnderecoDto } from "src/endereco/dto/createEndereco.dto"
export class CreateUserDto {
    @IsString()
    nome: string
    @IsEmail()
    email: string
    @IsString()
    senha: string
    @IsString()
    rua: string
    @IsString()
    bairro: string
    @IsString()
    numero: number
    @ValidateNested()
    @Type(() => CreateEnderecoDto)
    endereco: CreateEnderecoDto

}