import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../Entities/Usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
    constructor(@InjectRepository(Usuario) private usuario: Repository<Usuario>) { }
    async createUser(createdto: CreateUserDto) {
        await this.usuario.insert({
            ...createdto
        })
    }

}
