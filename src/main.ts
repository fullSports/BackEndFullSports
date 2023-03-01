import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Request, Response, NextFunction } from "express"
const cors = require('cors');
const { resolve } = require("path");
const express = require("express");
const path = require("path");


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use((req:Request, res:Response, next:NextFunction)=>{
     res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      next()
    }
    next()
})
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
  );
  const config = new DocumentBuilder()
    .setTitle("Api Full Sports")
    .setDescription("api da loja full sports e suas requisições")
    .setVersion("0.1.6")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("document", app, document);
  app.use(express.json());
  await app.listen(process.env.PORT);
  app.use("/ducument", express.static(resolve(__dirname, "./build")));
  Logger.log(`server on in http://localhost:${process.env.PORT}`);
  Logger.log(
    `application document in http://localhost:${process.env.PORT}/document`
  );
}
bootstrap();
