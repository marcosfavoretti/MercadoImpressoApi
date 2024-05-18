import { Injectable } from '@nestjs/common';
import { IGenericRepository } from '../../_domain/abstracts/IGenericRpository.abstract';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Endereco} from './Model/Endereco.entity';

export class EnderecoRepository implements IGenericRepository<Endereco>{
  
  constructor(@InjectRepository(Endereco) private enderecoRepo : Repository<Endereco>){}
  
  async create(endereco: Endereco): Promise<Endereco> {
    await this.enderecoRepo.insert(endereco)
    return endereco
  }
  async get(id: number): Promise<Endereco> {
    return await this.enderecoRepo.findOne({
      where:{
        id: id
      }
    })
  }
  async getAll(): Promise<Endereco[]> {
    return await this.enderecoRepo.find()
  }
  
update(id: number, data: Endereco): Promise<Endereco> {
  return undefined
}
delete(id: number): Promise<void> {
  return undefined
}
  
}