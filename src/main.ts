import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(':tenant?/api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(AppModule.port);
  console.log(` ** App started successfulluy on port ${AppModule.port} **`);
}
bootstrap();