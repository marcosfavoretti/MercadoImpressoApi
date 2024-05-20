/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ProdutoPersonalizadoCalc } from './services/price-calculator/ProdutoPersonalizadoCalc';
import { IProductsPersonalizadoCalc } from './abstracts/IProductsCalc.abstract';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

@Module({
    imports: [InfrastructureModule],
    controllers: [],
    providers: [ProdutoPersonalizadoCalc],
    exports: [ProdutoPersonalizadoCalc]
})
export class DomainModule { }
