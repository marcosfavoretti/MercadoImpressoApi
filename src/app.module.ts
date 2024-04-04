import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { CustomProjectsModule } from './custom-projects/custom-projects.module';
require('dotenv').config()
@Module({
  imports: [UploadModule, CustomProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
