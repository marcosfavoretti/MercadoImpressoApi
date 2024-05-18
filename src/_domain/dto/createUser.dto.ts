import { IsEmail, IsString, ValidateNested } from "class-validator"
import { Type } from "class-transformer"
import { CreateEnderecoDto } from "src/_domain/dto/createEndereco.dto"
import { ApiProperty } from "@nestjs/swagger"
export class CreateUserDto {
    @ApiProperty()
    @IsString()
    nome: string
    @ApiProperty()
    @IsEmail()
    email: string
    @ApiProperty()
    @IsString()
    senha: string
    @ApiProperty()
    @ValidateNested()
    @Type(() => CreateEnderecoDto)
    endereco: CreateEnderecoDto

}