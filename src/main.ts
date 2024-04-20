import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { UploadModule } from './upload/upload.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const option = new DocumentBuilder()
    .setTitle('Mercado Impresso')
    .setDescription("mercado Impresso API")
    .setVersion("1.0")
    .build()
  app.enableCors()
  const doc = SwaggerModule.createDocument(app, option)
  SwaggerModule.setup('api/doc', app, doc)
  await app.listen(3000);
}
bootstrap();
