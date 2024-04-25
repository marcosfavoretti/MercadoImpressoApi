import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsuarioService } from './usuario-service/usuario.service';
import { AuthDto } from './dto/auth.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { Response } from 'express';

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
}
