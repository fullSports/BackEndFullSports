import { Logger } from "@nestjs/common";
import { NestApplication, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as express from "express";
import * as path from "path";
async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
  );
  const config = new DocumentBuilder()
    .setTitle("Api Full Sports")
    .setDescription("api da loja full sports e suas requisições")
    .setVersion("0.1.11")
    .addOAuth2({
      type: "oauth2",
      bearerFormat: "JWT",
      flows: {
        password: {
          authorizationUrl: `http://localhost:${process.env.PORT}/auth/login-app`,
          tokenUrl: `http://localhost:${process.env.PORT}/auth/login-app`,
          scopes: {},
        },
      },
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);
  await app.listen(process.env.PORT);
  Logger.log(`server on in http://localhost:${process.env.PORT}`);
  Logger.log(
    `application document in http://localhost:${process.env.PORT}/swagger`
  );
}
bootstrap();
