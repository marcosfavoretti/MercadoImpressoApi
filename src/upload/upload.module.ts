import { Module } from '@nestjs/common';
import { UploadService } from './upload-service/upload.service';
import { UploadController } from './upload.controller';
import { ProdutoPersonalizadoModule } from 'src/produto_personalizado/produto_personalizado.module';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { TokenAuthModule } from 'src/token-auth/token-auth.module';

@Module({
  imports: [ProdutoPersonalizadoModule, TokenAuthModule],
  controllers: [UploadController],
  providers: [UploadService, AuthGuard],
})
export class UploadModule { }
