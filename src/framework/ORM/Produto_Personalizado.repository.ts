import { Injectable } from '@nestjs/common';
import { IGenericRepository } from '../../domain/abstracts/IGenericRpository.abstract';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { Produto_personalizado } from './Model/Produto_personalizado.entity';
import { Produto_personalizado } from 'src/domain/entities/produtopersonalizado.entity';
import { Usuario } from 'src/domain/entities/usuario.entity';

@Injectable()
export class ProdutoPersonalizadoRepository implements IGenericRepository<Produto_personalizado> {
  
  constructor(@InjectRepository(Produto_personalizado) private ProdutoPersonalizadoRepo: Repository<Produto_personalizado>) {}
  
  async create(produtoPersonalizado: Produto_personalizado): Promise<Produto_personalizado> {
    await this.ProdutoPersonalizadoRepo.insert(produtoPersonalizado);
    return produtoPersonalizado;
  }

  async get(id: number): Promise<Produto_personalizado> {
    return await this.ProdutoPersonalizadoRepo.findOne({ where: { id: id } });
  }

  async getAll(): Promise<Produto_personalizado[]> {
    return await this.ProdutoPersonalizadoRepo.find();
  }
  async update(id: number, data: Produto_personalizado): Promise<Produto_personalizado> {
    return undefined
  }
 

  async delete(id: number): Promise<void> {
   await this.ProdutoPersonalizadoRepo.delete({
    id : id
  })  
 }

 async deleteByUser(user: Usuario){
  await this.ProdutoPersonalizadoRepo.delete({
    UserId : user
  })  
 }

 async getProdByUser(user: Usuario){
    return await this.ProdutoPersonalizadoRepo.findOne({
      where:{
        UserId: user
      }
    })
 }
}
