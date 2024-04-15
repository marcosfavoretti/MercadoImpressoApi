import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { CustomProjectsModule } from './custom-projects/custom-projects.module';
import { TypeOrmModule } from "@nestjs/typeorm"
import { ProdutoPersonalizadoModule } from './produto_personalizado/produto_personalizado.module';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/Entities/Usuario.entity';
import { Produto_personalizado } from './produto_personalizado/Entities/Produto_personalizado.entity';
import { EnderecoModule } from './endereco/endereco.module';
require('dotenv').config()
@Module({
  imports: [UploadModule, CustomProjectsModule, TypeOrmModule.forRoot({
    type: "mysql",
    username: process.env.bd_usuario,
    password: process.env.bd_pass,
    database: process.env.bd_database,
    host: process.env.bd_host,
    port: 3306,
    synchronize: false,
    entities: [Usuario, Produto_personalizado]
  }), ProdutoPersonalizadoModule, UsuarioModule, EnderecoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
