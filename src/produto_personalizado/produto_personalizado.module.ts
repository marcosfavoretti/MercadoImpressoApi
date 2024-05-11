import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto_personalizado } from './Entities/Produto_personalizado.entity';
import { ProdutoPersonalizadoService } from './produto_personalizado-service/produto_personalizado/produto_personalizado.service';
import { PriceCalcModule } from 'src/price-calc/price-calc.module';

@Module({
    imports: [TypeOrmModule.forFeature([Produto_personalizado]), PriceCalcModule],
    providers: [ProdutoPersonalizadoService],
    exports: [ProdutoPersonalizadoService]
})
export class ProdutoPersonalizadoModule { }
