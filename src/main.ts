import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
const express = require("express");
const path = require("path");
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  const HOST = "0.0.0.0";
  app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
  );
  await app.listen(process.env.PORT);
  Logger.log(`server on in http://localhost:${process.env.PORT}`);
}
bootstrap();
