import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsuarioService } from './usuario-service/usuario.service';
import { AuthDto } from './dto/auth.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { TokenService } from 'src/token-auth/token-service/token.service';

@Controller('usuario')
export class UsuarioController {
    constructor(private usuarioService: UsuarioService, private token: TokenService) { }
    //crud de usuarios
    @ApiConsumes()
    @Post('/create')
    async createUsuario(@Body() createdto: CreateUserDto) {
        return await this.usuarioService.createUser(createdto)
    }

    @ApiConsumes()
    @Post('/validate')
    async auth(@Body() authdto: AuthDto, @Res() res: Response) {
        const token = await this.usuarioService.authService(authdto)
        res.cookie('token', token, { expires: new Date(Date.now() + 43200000), httpOnly: true }).status(200).send(token)
    }

    @ApiConsumes()
    @Get('/userinfos')
    async getUserInfos(@Req() req: Request, @Res() res: Response) {
        const user = await this.token.decodeToken(req.cookies.token)
        if(!user) res.status(200).send(user)
        delete user.senha
        return res.status(200).send(user)
    }
}
