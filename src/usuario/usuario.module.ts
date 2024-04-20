import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario-service/usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './Entities/Usuario.entity';
import { TokenAuthModule } from 'src/token-auth/token-auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    TokenAuthModule
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService]
})
export class UsuarioModule { }
