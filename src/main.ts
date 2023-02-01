import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


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
  const config = new DocumentBuilder()
    .setTitle("Api Full Sports")
    .setDescription('api da loja full sports e suas requisições')
    .setVersion("0.1.5")
    .build();
    const document = SwaggerModule.createDocument(app,config);
    SwaggerModule.setup("swagger.html",app,document);

      await app.listen(process.env.PORT);
  Logger.log(`server on in http://localhost:${process.env.PORT}`);
}
bootstrap();
