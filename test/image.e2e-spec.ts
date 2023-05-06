import { INestApplication } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { ImagemSchema, imagem } from "src/image/Schema/image.schema";
import { ImageController } from "src/image/image.controller";
import { ImageService } from "src/image/image.service";
import * as request from "supertest";
const path = require("path");
const urlConfig = require("./globalConfig.json");
let Id = String;
describe("Images", () => {
  let app: INestApplication;
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
      .then(function (response) {
        expect(response.body).toHaveProperty("messsagem" && "image");
        expect(response.status).toBe(201);
        Id = response.body.image._id;
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
    const ListImageId = await request(app.getHttpServer())
      .get(`/imagem/${Id}`)
      .expect(200);
    expect(Object);
    return ListImageId;
  });
  it("• /imagem/:id (DELETE)", async () => {
    const deleteImage = await request(app.getHttpServer())
      .delete(`/imagem/${Id}`)
      .expect(200);
    expect(deleteImage.body).toHaveProperty("messagem");
    return deleteImage;
  });
  it("• url-image (GET) return status 403", async () => {
    await request(app.getHttpServer()).get("/imagem");
  });
});
