import { Logger } from "@nestjs/common";
import { NestApplication, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as express from "express";
import * as path from "path";
import { useContainer } from "class-validator";
async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
  );
  const config = new DocumentBuilder()
    .setTitle("Api FullSports")
    .setDescription(
      "Api da loja full sports e suas requisições.\n Para realizazr o login, selecione request-body no campo 'credentials location' após clicar em 'Authorize'"
    )
    .setVersion("0.1.17")
    .addOAuth2({
      type: "oauth2",
      bearerFormat: "JWT",
      flows: {
        password: {
          authorizationUrl: `${process.env.URL_AUTHORIZATION}`,
          tokenUrl: `${process.env.URL_AUTHORIZATION}`,
          scopes: {},
        },
      },
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document, {
    customSiteTitle: "Api FullSports",
    customfavIcon: "https://avatars.githubusercontent.com/u/6936373?s=200&v=4",
    customJs: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js",
    ],
    customCssUrl: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css",
    ],
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT);
  Logger.debug(`server on in http://localhost:${process.env.PORT}`);
  Logger.debug(
    `application document in http://localhost:${process.env.PORT}/swagger`
  );
}
bootstrap();
