import { Injectable } from '@nestjs/common';
import { OmitType } from '@nestjs/swagger';
import { Usuario } from 'src/usuario/Entities/Usuario.entity';
const jwt = require('jsonwebtoken');


@Injectable()
export class TokenService {
    generateToken(usuario: Usuario) {
        const { senha, ...usuario_security } = usuario; // Desestruturação para excluir a senha
        return jwt.sign(usuario_security, process.env.auth_key)
    }
    decoteToken(token: string) {
        return jwt.verify(token, process.env.auth_key);
    }
}
