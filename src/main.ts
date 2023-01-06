import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT, '0.0.0.0');
  Logger.log(`server on in http://localhost:${process.env.PORT}`)
}
bootstrap();
