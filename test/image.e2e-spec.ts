import { INestApplication, Logger } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { async } from "rxjs";
import * as request from "supertest";
const path = require("path");
import { AppModule } from "../src/app.module";
var Id = String;
describe("Images", () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it("• /imagem (POST)", async () => {
    const PostImage = await request(app.getHttpServer())
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
    return PostImage;
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
  });
});
