import { Injectable } from '@nestjs/common';
import { OmitType } from '@nestjs/swagger';
import { Usuario } from 'src/usuario/Entities/Usuario.entity';
const jwt = require('jsonwebtoken');


@Injectable()
export class TokenService {
    generateToken(usuario: Usuario) {
        return jwt.sign(JSON.stringify(usuario), process.env.auth_key)
    }
    decodeToken(token: string) {
        const decode = jwt.verify(token, process.env.auth_key);
        return decode
    }
}
