import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Endereco } from '../Entities/Endereco.entity';
import { Repository } from 'typeorm';
import { CreateEnderecoDto } from '../dto/createEndereco.dto';

@Injectable()
export class EnderecoService {
    constructor(@InjectRepository(Endereco) private endereco: Repository<Endereco>) { }
    async createEndereco(createendereco: CreateEnderecoDto) {
        await this.endereco.insert({
            ...createendereco
        })
    }
}
