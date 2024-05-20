import { Injectable } from '@nestjs/common';
import { Usuario } from 'src/domain/entities/usuario.entity';
const jwt = require('jsonwebtoken');


@Injectable()
export class TokenService {
    generateToken(usuario: Usuario) {
        return jwt.sign(JSON.stringify(usuario), process.env.auth_key)
    }
    decodeToken(token: string) {
        return jwt.verify(token, process.env.auth_key);
    }
}
