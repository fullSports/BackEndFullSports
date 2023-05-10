import { Logger } from "@nestjs/common";
import { NestApplication, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
const express = require("express");
const path = require("path");
async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
  );
  app.use(
    "/document",
    express.static(path.resolve(__dirname, "..", "coverage"))
  );
  const config = new DocumentBuilder()
    .setTitle("Api Full Sports")
    .setDescription("api da loja full sports e suas requisições")
    .setVersion("0.1.11")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("document", app, document);
  await app.listen(process.env.PORT);
  Logger.log(`server on in http://localhost:${process.env.PORT}`);
  Logger.log(
    `application document in http://localhost:${process.env.PORT}/document`
  );
}
bootstrap();
