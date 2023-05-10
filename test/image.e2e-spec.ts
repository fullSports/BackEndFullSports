import { INestApplication } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { ImagemSchema, imagem } from "src/image/Schema/image.schema";
import { ImageController } from "src/image/image.controller";
import { ImageService } from "src/image/image.service";
import * as request from "supertest";
const path = require("path");
const urlConfig = require("./globalConfig.json");
describe("Images", () => {
  let app: INestApplication;
  let registerImage;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(urlConfig.mongoUri),
        MongooseModule.forFeature([
          { name: imagem.name, schema: ImagemSchema },
        ]),
      ],
      controllers: [ImageController],
      providers: [ImageService],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it("• /imagem (POST)", async () => {
    return await request(app.getHttpServer())
      .post("/imagem")
      .field("file", "img")
      .attach(
        "file",
        path.resolve(__dirname, "..", "test", "tmp", "e2e_nestjs.jpg")
      )
      .then((response) => {
        expect(response.body).toHaveProperty("messsagem" && "image");
        expect(response.status).toBe(201);
        registerImage = response.body.image;
      });
  });
  it("• /imagem (GET)", async () => {
    return request(app.getHttpServer())
      .get("/imagem")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(Array);
  });
  it("• /imagem/:id (GET)", async () => {
    await request(app.getHttpServer())
      .get(`/imagem/${registerImage._id}`)
      .expect(200);
    expect(Object);
  });
  it("• /imagem/:id (DELETE)", async () => {
    const deleteImage = await request(app.getHttpServer())
      .delete(`/imagem/${registerImage._id}`)
      .expect(200);
    expect(deleteImage.body).toHaveProperty("messagem");
    return deleteImage;
  });
});
