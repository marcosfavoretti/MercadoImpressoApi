import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoPersonalizadoService } from './produto_personalizado.service';

describe('ProdutoPersonalizadoService', () => {
  let service: ProdutoPersonalizadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdutoPersonalizadoService],
    }).compile();

    service = module.get<ProdutoPersonalizadoService>(ProdutoPersonalizadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
