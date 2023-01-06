import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './app.datasource';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/dashboard/api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Dashboard Back')
    .setDescription('Dashboard API for Oncase Fullstack Challenge')
    .setVersion('0.0.1')
    .build();

  await AppDataSource.initialize()
    .then(() => console.log('LOG [Typeorm] Success connection'))
    .catch((error) => console.log(error));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/dashboard/api/swagger', app, document);

  app.enableCors({
    origin: process.env.SERVER_URL,
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
