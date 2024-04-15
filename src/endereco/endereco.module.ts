import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Endereco } from './Entities/Endereco.entity';
import { EnderecoService } from './endereco-service/endereco.service';

@Module({
    imports: [TypeOrmModule.forFeature([Endereco])],
    providers: [EnderecoService]
})
export class EnderecoModule { }
