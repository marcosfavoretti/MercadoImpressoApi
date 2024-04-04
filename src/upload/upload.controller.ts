import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from "@nestjs/platform-express"
import { ApiConsumes } from '@nestjs/swagger';
import { Request } from 'express';
@Controller('projects')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }


  @Post()
  // @ApiConsumes('multipart/form-data')
  // @UseInterceptors(FileInterceptor('file'))
  async uploadProject(@UploadedFile() file: Express.Multer.File, @Req() body: Request) {
    console.log(file)
    console.log(body);
  }

}
