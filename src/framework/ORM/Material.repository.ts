import { Injectable } from '@nestjs/common';
import { IGenericRepository } from '../../domain/abstracts/IGenericRpository.abstract';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material} from './Model/material.entity';

export class MaterialRepository implements IGenericRepository<Material>{
  
  constructor(@InjectRepository(Material) private materialRepo : Repository<Material>){}
  
  async create(material: Material): Promise<Material> {
    await this.materialRepo.insert(material)
    return material
  }
  async get(id: number): Promise<Material> {
    return await this.materialRepo.findOne({
      where:{
        id: id
      }
    })
  }
  async getAll(): Promise<Material[]> {
    return await this.materialRepo.find()
  }
  
  update(id: number, data: Material): Promise<Material> {
    return undefined
  }

  delete(id: number): Promise<void> {
    return
  }
  
}