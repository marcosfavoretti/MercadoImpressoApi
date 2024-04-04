import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from "@nestjs/platform-express"
import { ApiConsumes } from '@nestjs/swagger';
import { Request } from 'express';
@Controller('projects')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }


  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProject(@UploadedFile() file: Express.Multer.File) {
    console.log(file)
    /*
    {
  fieldname: 'file',
  originalname: 'Unidade de USB (F) 
- Atalho.lnk.STL',
  encoding: '7bit',
  mimetype: 'application/octet-stream',
  buffer: <Buffer 73 6f 6c 69 64 20 ...
  size: 48584
}
    */

  }

}
