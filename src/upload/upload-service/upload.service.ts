import { Injectable } from '@nestjs/common';
import { ProdutoPersonalizadoService } from 'src/produto_personalizado/produto_personalizado-service/produto_personalizado/produto_personalizado.service';
import { ProdutoPersonalizadoModule } from 'src/produto_personalizado/produto_personalizado.module';
import { Usuario } from 'src/usuario/Entities/Usuario.entity';
const NodeStl = require("node-stl");
@Injectable()
export class UploadService {
    constructor(private produtoPersonalizado: ProdutoPersonalizadoService) { }

    async cadastraModeloPersonalizado(file: Express.Multer.File, usuario: Usuario) {
        var stl = new NodeStl(file.path, { density: 1.04 });
        await this.produtoPersonalizado.createProdutoPersonalizado({
            nome: file.originalname,
            modelo3d: file.path,
            area_superficie: stl.area,
            volume: stl.volume,
            userId: usuario
        })
    }

}
