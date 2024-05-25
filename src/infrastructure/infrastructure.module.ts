import { TypeOrmModule } from "@nestjs/typeorm"
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AuthGuard } from "./auth-gurad/auth.guard";
import { TokenService } from "./token-service/token.service";
import { Module } from "@nestjs/common";
import { Produto_personalizado } from "src/framework/ORM/Model/Produto_personalizado.entity";
import { Usuario } from "src/framework/ORM/Model/Usuario.entity";
import { Endereco } from "src/framework/ORM/Model/Endereco.entity";
import { StlMeasuresService } from "./stl-measures-service/stlmeasures.service";
require('dotenv').config()
@Module({
    imports: [ServeStaticModule.forRoot({
        rootPath: path.join(__dirname,'../Uploads'),
        // rootPath: process.env.upload_location,
      }),
      TypeOrmModule.forRoot({
        type: "mssql",
        username: process.env.bd_usuario,
        password: process.env.bd_pass,
        database: process.env.bd_database,
        host: process.env.bd_host,
        port: +process.env.bd_port,
        synchronize: false,
        entities: [Usuario, Endereco, Produto_personalizado]
      }),],
    controllers: [],
    providers: [AuthGuard, TokenService, StlMeasuresService],
    exports: [AuthGuard, TokenService,StlMeasuresService]
})
export class InfrastructureModule {}
