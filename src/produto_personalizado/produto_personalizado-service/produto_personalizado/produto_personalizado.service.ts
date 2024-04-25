import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto_personalizado } from 'src/produto_personalizado/Entities/Produto_personalizado.entity';
import { CreateProdutoPersonalizadoDto } from 'src/produto_personalizado/dto/createProdutoPersonalizadoDto';
import { Repository } from 'typeorm';

@Injectable()
export class ProdutoPersonalizadoService {
    constructor(@InjectRepository(Produto_personalizado) private produtoPersonalizado: Repository<Produto_personalizado>) { }

    async createProdutoPersonalizado(createprodutopersonalizado: CreateProdutoPersonalizadoDto) {
        await this.produtoPersonalizado.insert({
            nome: createprodutopersonalizado.nome,
            modelo3d: createprodutopersonalizado.modelo3d,
            area_superficie: createprodutopersonalizado.area_superficie,
            volume: createprodutopersonalizado.volume,
            UserId: createprodutopersonalizado.userId // Supondo que 'UserId' é o nome da coluna que armazena o ID do usuário na tabela Produto_personalizado
        });
    }



}
