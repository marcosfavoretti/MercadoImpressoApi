import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
const cookieParser = require('cookie-parser');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const option = new DocumentBuilder()
    .setTitle('Mercado Impresso')
    .setDescription("mercado Impresso API")
    .setVersion("1.0")
    .build()
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:4200'
  })
  app.use(cookieParser())
  const doc = SwaggerModule.createDocument(app, option)
  SwaggerModule.setup('api/doc', app, doc)
  await app.listen(3000);
}
bootstrap();
