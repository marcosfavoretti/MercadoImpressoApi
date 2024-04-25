import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../Entities/Usuario.entity';
import { Repository } from 'typeorm';
import { AuthDto } from '../dto/auth.dto';
import { TokenAuthModule } from 'src/token-auth/token-auth.module';
import { TokenService } from 'src/token-auth/token-service/token.service';

@Injectable()
export class UsuarioService {
    constructor(@InjectRepository(Usuario) private usuario: Repository<Usuario>, private token: TokenService) { }
    async createUser(createdto: CreateUserDto) {
        await this.usuario.insert({
            ...createdto
        })
    }

    async auth(auth: AuthDto) {
        const usuario = await this.usuario.findOne({
            where: {
                nome: auth.nome,
                senha: auth.senha
            }
        })
        if (!usuario) throw new HttpException("Usuario nao encontrado", 404)
        return this.token.generateToken(usuario)
    }

}
