import { Request } from "express"
import { UsuarioRepository } from "src/_framework/ORM/Usuario.repository"
import { TokenService } from "src/_infrastructure/token-service/token.service"

export class PegarUsuarioUseCase{
    constructor(
        private tokenService: TokenService
        ){}
    
    async execute(req: Request){
       const user = await this.tokenService.decodeToken(req.cookies.token)
        if (!user) return
        delete user.senha
        return user
    }
}
