import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
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
  async uploadProject(@UploadedFile() file: Express.Multer.File) {
    console.log(file);

  }

}
