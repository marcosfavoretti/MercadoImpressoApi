import { Injectable } from '@nestjs/common';
import { OmitType } from '@nestjs/swagger';
import { Usuario } from 'src/usuario/Entities/Usuario.entity';
const jwt = require('jsonwebtoken');


@Injectable()
export class TokenService {
    generateToken(usuario: Usuario) {
        return jwt.sign(JSON.stringify(usuario), process.env.auth_key)
    }
    async decodeToken(token: string) {
        return await new Promise<Usuario | undefined>((resolve, reject)=>{
            try{
                const decode = jwt.verify(token, process.env.auth_key);
            resolve(decode)
            }
            catch(err){
                resolve(undefined)
            }

        }) 
    }
}
