import { HttpException, Injectable } from "@nestjs/common";
import { AuthDto } from "src/domain/dto/auth.dto";
import { UsuarioRepository } from "src/framework/ORM/Usuario.repository";
import { TokenService } from "src/infrastructure/token-service/token.service";

@Injectable()
export class LoginUsuarioAuthCases{
    constructor(
        private usuarioRep: UsuarioRepository,
        private tokenService: TokenService
        ){}
    
        async auth(auth: AuthDto){
        const usuario = await this.usuarioRep.getUserBylogin(auth.nome, auth.senha)
        if (!usuario) throw new HttpException("Usuario nao encontrado", 404)
        return this.tokenService.generateToken(usuario)
    }
}