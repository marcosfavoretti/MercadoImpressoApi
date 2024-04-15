import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsuarioService } from './usuario-service/usuario.service';

@Controller('usuario')
export class UsuarioController {
    constructor(private usuarioService: UsuarioService) { }
    //crud de usuarios
    @Post('/create')
    createUsuario(@Body() createdto: CreateUserDto) {
        
    }

}
