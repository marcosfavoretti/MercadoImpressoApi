import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { UploadModule } from './upload/upload.module';
import * as cookieParser from 'cookie-parser';
import fastifyCookie from '@fastify/cookie';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const option = new DocumentBuilder()
    .setTitle('Mercado Impresso')
    .setDescription("mercado Impresso API")
    .setVersion("1.0")
    .build()

  app.enableCors({
    origin: ['http://192.168.100.10:4200', 'http://localhost:4200'],
    credentials: true, // Permita credenciais
    
  })
  app.use(cookieParser());
  const doc = SwaggerModule.createDocument(app, option)
  SwaggerModule.setup('api/doc', app, doc)

  await app.listen(3000);
}
bootstrap();
