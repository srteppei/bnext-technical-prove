import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {useContainer} from "class-validator";

function openApi(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Bnext technical prove')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  openApi(app);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3000);
}

bootstrap();
