import { Body, Controller, FileTypeValidator, HttpStatus, MaxFileSizeValidator, ParseFilePipe, ParseFilePipeBuilder, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload-service/upload.service';
import { FileInterceptor } from "@nestjs/platform-express"
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
@Controller('projects')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }


  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        // comment: { type: 'string' },
        // outletId: { type: 'integer' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadProject(@UploadedFile(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: 'application/octet-stream', //validação se o arquivo é um stl
      })
      // .addMaxSizeValidator({
      //   maxSize: 1000
      // })
      .build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY//reponse de erro quando algo nao for certo
      }),
  )
  file: Express.Multer.File,) {
    const buffer = Buffer.from(await file.buffer);
    
  }

}
