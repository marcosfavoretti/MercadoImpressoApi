import { Body, Controller, Get, Inject, Post, Req, Res, UseGuards, HttpCode } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { TokenService } from 'src/infrastructure/token-service/token.service';
import { AuthDto } from 'src/domain/dto/auth.dto';
import { CreateUserDto } from 'src/domain/dto/createUser.dto';
import { LoginUsuarioAuthCases } from 'src/use-cases/usuario/LoginUsuario.useCases';
import {  PegarUsuarioUseCase } from 'src/use-cases/usuario/PegarUsuario.useCases';
import { CreateUsuarioUseCase } from 'src/use-cases/usuario/CreateUsuario.UseCase';

@ApiTags('Usuario')
@Controller('usuario')
export class UsuarioController {

    @Inject('loginUsuarioUseCase') private readonly loginUserUseCase: LoginUsuarioAuthCases
    @Inject('pegarUsuarioUseCase') private readonly getUserUseCase: PegarUsuarioUseCase
    @Inject('createUsuarioCase') private readonly createUserUseCase: CreateUsuarioUseCase

    //crud de usuarios
    @ApiConsumes()
    @Post()
    async createUsuario(@Body() createdto: CreateUserDto) {
        await this.createUserUseCase.create(createdto)
    }

    @ApiConsumes()
    @HttpCode(200)
    @Post('/login')
    async auth(@Body() authdto: AuthDto, @Res() res: Response) {
        const token = await this.loginUserUseCase.auth(authdto)
        res.cookie('token', token, { expires: new Date(Date.now() + 43200000), httpOnly: true, sameSite: 'none', secure: true }).status(200).send(token)
    }

    @ApiConsumes()
    @HttpCode(200)
    @Get()
    async getUserInfos(@Req() req: Request, @Res() res: Response) {
        const user = await this.getUserUseCase.execute(req)
        return res.send(user).status(200)
    
    }
}
