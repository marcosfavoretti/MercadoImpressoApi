import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario/usuario.controller';
import { Produto_personalizadoController } from './produto_personalizado/produto_personalizado.controller';
import { InfrastructureModule } from 'src/_infrastructure/infrastructure.module';
import { UseCaseModule } from 'src/_use-cases/usecase.module';
import { LoginUsuarioAuthCases } from 'src/_use-cases/usuario/LoginUsuario.useCases';
import { UsuarioRepository } from 'src/_framework/ORM/Usuario.repository';
import { TokenService } from 'src/_infrastructure/token-service/token.service';
import { RepositoryModule } from 'src/_framework/ORM/repository.module'; // Importe o RepositoryModule
import { PegarUsuarioUseCase } from 'src/_use-cases/usuario/PegarUsuario.useCases';
import { CreateUsuarioUseCase } from 'src/_use-cases/usuario/CreateUsuario.UseCase';
import { ProdutoPersonalizadoRepository } from 'src/_framework/ORM/Produto_Personalizado.repository';
import { CrateProdutoPersonalizadoUseCase } from 'src/_use-cases/produto_personalizado/createProdutoPersonalizado.usecase';
import { StlMeasuresService } from 'src/_infrastructure/stl-measures-service/stlmeasures.service';
import { PegaProdutoPersonalizadoUseCase } from 'src/_use-cases/produto_personalizado/pegarProdutoPersonalizado.useCase';
import { DeletarProdutoPersonalizadoUseCase } from 'src/_use-cases/produto_personalizado/deletarProdutoPersonalizado.UseCase';
import { CalculateProdutoPersonalizadoUseCase } from 'src/_use-cases/produto_personalizado/calculateProdutoPersonalizado.UseCase';
import { DomainModule } from 'src/_domain/domain.module';
import { ProdutoPersonalizadoCalc } from 'src/_domain/services/price-calculator/ProdutoPersonalizadoCalc';

@Module({
    imports: [InfrastructureModule, UseCaseModule, RepositoryModule, DomainModule], // Importe o RepositoryModule
    controllers: [UsuarioController, Produto_personalizadoController],
    providers: [{
        provide: 'loginUsuarioUseCase',
        useFactory: (
            usuarioRep: UsuarioRepository,
             tokenService: TokenService) => {
          return new LoginUsuarioAuthCases(usuarioRep, tokenService);
        },
        inject: [UsuarioRepository, TokenService],
    },
    {
        provide: 'pegarUsuarioUseCase',
        useFactory: (
             tokenService: TokenService) => {
          return new PegarUsuarioUseCase( tokenService);
        },
        inject: [ TokenService],
    },{
        provide: 'createUsuarioCase',
        useFactory: (
            usuarioRep: UsuarioRepository,
            ) => {
          return new CreateUsuarioUseCase( usuarioRep);
        },
        inject: [ UsuarioRepository],
    },
    {
        provide: 'createProdutoPersonalizadoUseCase',
        useFactory: (
            produtoPersonalizadoRep: ProdutoPersonalizadoRepository,
            stlmeasureService: StlMeasuresService
            ) => {
          return new CrateProdutoPersonalizadoUseCase( produtoPersonalizadoRep, stlmeasureService);
        },
        inject: [ ProdutoPersonalizadoRepository, StlMeasuresService],
    },
    {
        provide: 'pegarProdutoPersonalizadoUseCase',
        useFactory: (
            produtoPersonalizadoRep: ProdutoPersonalizadoRepository,
            ) => {
          return new PegaProdutoPersonalizadoUseCase( produtoPersonalizadoRep);
        },
        inject: [ ProdutoPersonalizadoRepository],
    },
    {
        provide: 'deletarProdutoPersonalizadoUseCase',
        useFactory: (
            produtoPersonalizadoRep: ProdutoPersonalizadoRepository,
            ) => {
          return new DeletarProdutoPersonalizadoUseCase( produtoPersonalizadoRep);
        },
        inject: [ ProdutoPersonalizadoRepository],
    },{
    provide: 'cacularProdutoPersonalizadoUseCase',
    useFactory: (
        produtoPersonalizadoRep: ProdutoPersonalizadoRepository,
        calcProdPersonalizado: ProdutoPersonalizadoCalc
        ) => {
      return new CalculateProdutoPersonalizadoUseCase( produtoPersonalizadoRep, calcProdPersonalizado);
    },
    inject: [ ProdutoPersonalizadoRepository, ProdutoPersonalizadoCalc],
}],
})
export class ControllerModule {}
