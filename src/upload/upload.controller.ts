import { Body, Controller, FileTypeValidator, HttpStatus, MaxFileSizeValidator, ParseFilePipe, ParseFilePipeBuilder, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload-service/upload.service';
import { FileInterceptor } from "@nestjs/platform-express"
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { existsSync, mkdirSync } from 'fs';
import { v4 as uuid } from 'uuid';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';
import { AuthGuard } from '../guard/auth/auth.guard';

@Controller('projects')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

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
        const uploadPath = process.env.upload_location
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
  @UseGuards(AuthGuard)
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
  file: Express.Multer.File, @Req() request: Request) {
    await this.uploadService.cadastraModeloPersonalizado(file, {
      ...JSON.parse(request.headers['user'] as string)
    })
  }

}
