import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsuarioService } from './usuario-service/usuario.service';
import { AuthDto } from './dto/auth.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/guard/auth/auth.guard';

@Controller('usuario')
export class UsuarioController {
    constructor(private usuarioService: UsuarioService) { }
    //crud de usuarios
    @ApiConsumes()
    @Post('/create')
    async createUsuario(@Body() createdto: CreateUserDto) {
        return await this.usuarioService.createUser(createdto)
    }

    @ApiConsumes()
    @Post('/validate')
    async auth(@Body() authdto: AuthDto, @Res() res: Response) {
        const token = await this.usuarioService.auth(authdto)
        res.cookie('token', token, { expires: new Date(Date.now() + 43200000), httpOnly: true }).status(200).send(token)
    }

    @UseGuards(AuthGuard)
    @ApiConsumes()
    @Get('/userinfos')
    async getUserInfos(@Req() req: Request) {
        const user = JSON.parse(req.headers['user'] as string)
        delete user.senha
        return user
    }
}
