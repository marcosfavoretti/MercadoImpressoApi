import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from './Model/material.entity';
import { Endereco } from './Model/Endereco.entity';
import { Usuario } from './Model/Usuario.entity';
import { UsuarioRepository } from './Usuario.repository';
import { Produto_personalizado } from './Model/Produto_personalizado.entity';
import { ProdutoPersonalizadoRepository } from './Produto_Personalizado.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Material, Endereco, Produto_personalizado, Usuario
        ])
    ],
    controllers: [],
    providers: [UsuarioRepository, ProdutoPersonalizadoRepository],
    exports: [UsuarioRepository, ProdutoPersonalizadoRepository],
})
export class RepositoryModule {}
