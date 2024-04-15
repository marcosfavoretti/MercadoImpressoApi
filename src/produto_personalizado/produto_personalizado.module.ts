import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto_personalizado } from './Entities/Produto_personalizado.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Produto_personalizado])]
})
export class ProdutoPersonalizadoModule { }
