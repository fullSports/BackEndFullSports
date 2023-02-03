import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
const { resolve } = require('path');
const express = require("express");
const path = require("path");
const cors = require ("cors");
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  const HOST = "0.0.0.0";
  app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
  );
  app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Headers", '*');
    res.header("Access-Control-Allow-Origin", '*');
    res.header("'Content-Type'", "'multipart/form-data'");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors())
    next()
})
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
