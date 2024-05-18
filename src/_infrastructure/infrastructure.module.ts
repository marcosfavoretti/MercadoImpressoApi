import { TypeOrmModule } from "@nestjs/typeorm"
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { AuthGuard } from "./auth-gurad/auth.guard";
import { TokenService } from "./token-service/token.service";
import { Module } from "@nestjs/common";
import { Produto_personalizado } from "src/_framework/ORM/Model/Produto_personalizado.entity";
import { Usuario } from "src/_framework/ORM/Model/Usuario.entity";
import { Endereco } from "src/_framework/ORM/Model/Endereco.entity";
import { StlMeasuresService } from "./stl-measures-service/stlmeasures.service";
require('dotenv').config()
@Module({
    imports: [ServeStaticModule.forRoot({
        // rootPath: resolve(__dirname, './produto_personalizado/Uploads'),
        rootPath: process.env.upload_location,

      }),
      TypeOrmModule.forRoot({
        type: "mysql",
        username: process.env.bd_usuario,
        password: process.env.bd_pass,
        database: process.env.bd_database,
        host: process.env.bd_host,
        port: 3306,
        synchronize: false,
        entities: [Usuario, Endereco, Produto_personalizado]
      }),],
    controllers: [],
    providers: [AuthGuard, TokenService, StlMeasuresService],
    exports: [AuthGuard, TokenService,StlMeasuresService]
})
export class InfrastructureModule {}
