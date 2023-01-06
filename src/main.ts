import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  app.useGlobalPipes(new ValidationPipe());
  const HOST = '0.0.0.0';
  await app.listen(process.env.PORT, HOST);
  Logger.log(`server on in http://localhost:${process.env.PORT}`)
}
bootstrap();
