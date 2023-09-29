import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppService } from "src/app.service";
import { AppController } from "src/app.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";
const urlConfig = require("./globalConfig.json");
describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(urlConfig.mongoUri), AuthModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/ (GET)", async () => {
    const acessToke = (
      await request(app.getHttpServer())
        .post("/auth/login-app")
        .send({
          client_id: String(process.env.clientId),
          client_secret: String(process.env.clientSecret),
        })
    ).body.access_token;
    await request(app.getHttpServer())
      .get("/")
      .auth(String(acessToke), {
        type: "bearer",
      })
      .expect(200)
      .expect({ menssage: "servidor iniciado" });
  });
});
