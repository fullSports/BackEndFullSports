import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppService } from "src/app.service";
import { AppController } from "src/app.controller";
import { MongooseModule } from "@nestjs/mongoose";
const urlConfig = require("./globalConfig.json");
describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(urlConfig.mongoUri)],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/ (GET)", async () => {
    await request(app.getHttpServer())
      .get("/")
      .expect(200)
      .expect({ menssage: "servidor iniciado" });
  });
});
