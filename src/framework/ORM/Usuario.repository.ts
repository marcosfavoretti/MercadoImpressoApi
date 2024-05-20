import { IGenericRepository } from '../../domain/abstracts/IGenericRpository.abstract';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/domain/entities/usuario.entity';

export class UsuarioRepository implements IGenericRepository<Usuario>{
  
  constructor(@InjectRepository(Usuario) private usuarioRepo : Repository<Usuario>){}
  
  async create(usuario: Usuario): Promise<Usuario> {
    await this.usuarioRepo.insert(usuario)
    return usuario
  }
  async get(id: number): Promise<Usuario> {
    return await this.usuarioRepo.findOne({
      where:{
        id: id
      }
    })
  }
  async getAll(): Promise<Usuario[]> {
    return await this.usuarioRepo.find()
  }
  
async update(id: number, data: Usuario): Promise<Usuario> {
  return undefined
}
  async getUserBylogin(name: string, password: string): Promise<Usuario>{
    return await this.usuarioRepo.findOne({
      where:{
        nome: name,
        senha: password
      }
    })
  }

  async  delete(id: number): Promise<void> {
      return undefined
  }
}