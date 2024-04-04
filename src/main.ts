import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { UploadModule } from './upload/upload.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const option = new DocumentBuilder()
    .setTitle('TESTE')
    .setDescription("teste para ver funcionamento")
    .setVersion("1.0")
    .addTag('teste')
    .build()
  app.enableCors()
  const doc = SwaggerModule.createDocument(app, option, {
    include: [AppModule, UploadModule]
  })
  SwaggerModule.setup('api/doc', app, doc)
  await app.listen(3000);
}
bootstrap();
