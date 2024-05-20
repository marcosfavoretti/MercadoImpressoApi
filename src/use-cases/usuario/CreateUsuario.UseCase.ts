import {  Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/domain/dto/createUser.dto";
import { Usuario } from "src/domain/entities/usuario.entity";
import { UsuarioRepository } from "src/framework/ORM/Usuario.repository";

@Injectable()
export class CreateUsuarioUseCase{
    constructor(
        private usuarioRep: UsuarioRepository,
        ){}
    
        async create(createUserDto: CreateUserDto){
        const usuario = new Usuario()
        Object.assign(usuario, createUserDto)
        await this.usuarioRep.create({
            ...usuario
        })
    }
}