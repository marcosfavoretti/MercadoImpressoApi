import { Controller, HttpStatus, Get, ParseFilePipeBuilder, Post, Req, UploadedFile, UseGuards, UseInterceptors, Delete, Body } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express"
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { existsSync, mkdirSync } from 'fs';
import { v4 as uuid } from 'uuid';
import { diskStorage } from 'multer';
import { extname, resolve } from 'path';
import { Request } from 'express';
import { AuthGuard } from '../guard/auth/auth.guard';
import { ProdutoPersonalizadoService } from './produto_personalizado-service/produto_personalizado/produto_personalizado.service';
import { PriceCalculatorService } from 'src/price-calc/price-calculator-service/price-calculator.service';
import { CustomProdutoPersonalizadoDto } from './dto/customProdutoPersonalizadoDto';

@UseGuards(AuthGuard)
@Controller("produtopersonalizado")
export class Produto_personalizadoController {
  constructor(
    private produtoPersonalizadoService: ProdutoPersonalizadoService,
    private priceCalculatorService: PriceCalculatorService) { }

  @Post('newmodel')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (req, file, cb) => {
        const uploadPath = resolve(__dirname, './Uploads');
        if (!existsSync(uploadPath)) {
          mkdirSync(uploadPath)
        }
        cb(null, uploadPath)
      },
      filename: (req, file, cb) => {
        cb(null, `${uuid()}${extname(file.originalname)}`)
      }
    })
  }))
  async uploadProject(@UploadedFile(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: 'application/octet-stream', //validação se o arquivo é um stl
      })
      // .addMaxSizeValidator({
      //   maxSize: 10000
      // })
      .build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY//reponse de erro quando algo nao for certo
      }),
  )
  //  
  file: Express.Multer.File, @Req() request: Request) {
    await this.produtoPersonalizadoService.createProdutoPersonalizado({
      userId: JSON.parse(request.headers['user'] as string),
      area_superficie: this.produtoPersonalizadoService.getProdutoArea(file),
      volume: this.produtoPersonalizadoService.getProdutoVolume(file),
      modelo3d: file.path,
      nome: file.originalname
    })
  }

  @Delete('deleteProjeto')
  async deleteModeloCadastrado(@Req() request: Request) {
    return this.produtoPersonalizadoService.deleteModelobyUser(JSON.parse(request.headers['user'] as string))

  }
  @Get('getProjeto')
  async getModeloCadastrado(@Req() request: Request) {
    return this.produtoPersonalizadoService.getModelobyUser(JSON.parse(request.headers['user'] as string))
  }

  @Post('pricecalculator')
  async calculatePrice(@Req() request: Request, @Body() custom: CustomProdutoPersonalizadoDto) {
    const projeto = await this.produtoPersonalizadoService.getModelobyUser(JSON.parse(request.headers['user'] as string))
    return this.priceCalculatorService.calculatePrice(custom, projeto)
  }

}
