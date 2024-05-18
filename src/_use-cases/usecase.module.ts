import { Module } from '@nestjs/common';
import { TokenService } from 'src/_infrastructure/token-service/token.service';
import { LoginUsuarioAuthCases } from './usuario/LoginUsuario.useCases';
import { UsuarioRepository } from 'src/_framework/ORM/Usuario.repository';
import { RepositoryModule } from 'src/_framework/ORM/repository.module';
import { IGenericRepository } from 'src/_domain/abstracts/IGenericRpository.abstract';
import { InfrastructureModule } from 'src/_infrastructure/infrastructure.module';
import { PegarUsuarioUseCase } from './usuario/PegarUsuario.useCases';
import { CreateUsuarioUseCase } from './usuario/CreateUsuario.UseCase';
import { CreateProdutoPersonalizadoDto } from 'src/_domain/dto/createProdutoPersonalizado.dto';
import { CrateProdutoPersonalizadoUseCase } from './produto_personalizado/createProdutoPersonalizado.usecase';
import { CalculateProdutoPersonalizadoUseCase } from './produto_personalizado/calculateProdutoPersonalizado.UseCase';
import { DomainModule } from 'src/_domain/domain.module';

@Module({
  imports: [RepositoryModule, InfrastructureModule, DomainModule],
  providers: [
    LoginUsuarioAuthCases,
    PegarUsuarioUseCase,
    CreateUsuarioUseCase,
    CrateProdutoPersonalizadoUseCase,
    CalculateProdutoPersonalizadoUseCase
  ],
  exports : [LoginUsuarioAuthCases, 
    PegarUsuarioUseCase,
     CreateUsuarioUseCase,
      CrateProdutoPersonalizadoUseCase,
      CalculateProdutoPersonalizadoUseCase
    ]
})
export class UseCaseModule {}
