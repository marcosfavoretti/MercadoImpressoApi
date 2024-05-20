import { Request } from "express"
import { UsuarioRepository } from "src/framework/ORM/Usuario.repository"
import { TokenService } from "src/infrastructure/token-service/token.service"

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
