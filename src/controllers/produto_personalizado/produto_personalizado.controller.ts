import { Controller, HttpStatus,HttpCode, Get, ParseFilePipeBuilder, Post, Req, UploadedFile, UseGuards, UseInterceptors, Delete, Body, Inject } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express"
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { existsSync, mkdirSync } from 'fs';
import { v4 as uuid } from 'uuid';
import { diskStorage } from 'multer';
import { extname, resolve } from 'path';
import { Request } from 'express';
import { AuthGuard } from 'src/infrastructure/auth-gurad/auth.guard';
import { CrateProdutoPersonalizadoUseCase } from 'src/use-cases/produto_personalizado/createProdutoPersonalizado.usecase';
import { PegaProdutoPersonalizadoUseCase } from 'src/use-cases/produto_personalizado/pegarProdutoPersonalizado.useCase';
import { DeletarProdutoPersonalizadoUseCase } from 'src/use-cases/produto_personalizado/deletarProdutoPersonalizado.UseCase';
import { CustomProdutoPersonalizadoDto } from 'src/domain/dto/updateProdutoPersonalizado.dot';
import { CalculateProdutoPersonalizadoUseCase } from 'src/use-cases/produto_personalizado/calculateProdutoPersonalizado.UseCase';


@ApiTags('Produto Personalizado')
@UseGuards(AuthGuard)
@Controller("produtopersonalizado")
export class Produto_personalizadoController {
  @Inject('createProdutoPersonalizadoUseCase') private readonly createProdPesonalizadoUseCase: CrateProdutoPersonalizadoUseCase
  @Inject('pegarProdutoPersonalizadoUseCase') private readonly pegarProdPersonalizadoUseCase: PegaProdutoPersonalizadoUseCase
  @Inject('deletarProdutoPersonalizadoUseCase') private readonly deletarProdPersonalizadoUseCase: DeletarProdutoPersonalizadoUseCase
  @Inject('cacularProdutoPersonalizadoUseCase') private readonly calcularProdPersonalizadoUseCase: CalculateProdutoPersonalizadoUseCase
  
  @Post()
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
        // const uploadPath = process.env.upload_location;

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
        fileType: 'application/octet-stream', 
      })
      // .addMaxSizeValidator({
      //   maxSize: 10000
      // })
      .build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
      }),
  )
  file: Express.Multer.File, @Req() request: Request) {
    await this.createProdPesonalizadoUseCase.create(file, JSON.parse(request.headers['user'] as string))
  }

  @Delete()
  async deleteModeloCadastrado(@Req() request: Request) {
    await this.deletarProdPersonalizadoUseCase.delete(JSON.parse(request.headers['user'] as string))
  }

  @Get()
  @HttpCode(200)
  async getModeloCadastrado(@Req() request: Request) {
    return await this.pegarProdPersonalizadoUseCase.execute(JSON.parse(request.headers['user'] as string))
  }
  
  @Post('pricecalculator')
  @HttpCode(200)
  async calculatePrice(@Req() request: Request, @Body() custom: CustomProdutoPersonalizadoDto) {
    return this.calcularProdPersonalizadoUseCase.calc(JSON.parse(request.headers['user'] as string), custom)
  }

}
