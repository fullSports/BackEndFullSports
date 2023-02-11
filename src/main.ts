import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NextFunction, Request, Response } from "express";
const { resolve } = require('path');
const express = require("express");
const path = require("path");
const cors = require ("cors");
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  app.useGlobalPipes(new ValidationPipe());
  const HOST = "0.0.0.0";
  app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
  );
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://fullsports.dev.br',
      'https://sig3-components.vercel.app'
    ],
    methods: ["GET", "POST","DELETE","PUT"],
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle("Api Full Sports")
    .setDescription('api da loja full sports e suas requisições')
    .setVersion("0.1.6")
    .build();
    const document = SwaggerModule.createDocument(app,config);
    SwaggerModule.setup("document",app,document);
    
     await app.listen(process.env.PORT);
     app.use('/ducument',express.static(resolve(__dirname,"./build")));
  Logger.log(`server on in http://localhost:${process.env.PORT}`);
  Logger.log(`application document in http://localhost:${process.env.PORT}/document`);
}
bootstrap();
