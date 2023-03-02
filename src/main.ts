import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
const { resolve } = require("path");
const express = require("express");
const path = require("path");
const cors = require("cors")
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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

  var whitelist = ['http://localhost:3000', 'https://www.fullsports.dev.br'];
  app.enableCors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        console.log("allowed cors for:", origin)
        callback(null, true)
      } else {
        console.log("blocked cors for:", origin)
        callback(new Error('Not allowed by CORS'))
      }
    },
    allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
    credentials: true,
  });
  await app.listen(process.env.PORT);
  app.use("/ducument", express.static(resolve(__dirname, "./build")));
  Logger.log(`server on in http://localhost:${process.env.PORT}`);
  Logger.log(
    `application document in http://localhost:${process.env.PORT}/document`
  );
}
bootstrap();
