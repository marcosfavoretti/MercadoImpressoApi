import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AuthDto {
    @ApiProperty({
        example: 'marcos'
    })
    @IsString()
    nome: string
    @ApiProperty({
        example: 'ju150203'
    })    
    @IsString()
    senha: string

}