import { Test, TestingModule } from "@nestjs/testing";
import { ImageController } from "./image.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ImagemSchema, imagem } from "./Schema/image.schema";
import { ImageService } from "./image.service";
const path = require("path");
const urlConfig = require("../globalConfig.json");

describe("ImageController", () => {
  let imagemController: ImageController;
  let registeredCustomerImagem;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(urlConfig.mongoUri),
        MongooseModule.forFeature([
          { name: imagem.name, schema: ImagemSchema },
        ]),
      ],
      controllers: [ImageController],
      providers: [ImageService],
    }).compile();
    imagemController = app.get<ImageController>(ImageController);
  });
  describe("👨‍💻 MethodsImage:", () => {
    it("• uploudImage()", async () => {
      console.log(
        path.resolve(__dirname, "..", "..", "test", "tmp", "e2e_nestjs.jpg")
      );
      const UploadImage = await imagemController.uploudImage(
        path.resolve(__dirname, "..", "..", "test", "tmp", "e2e_nestjs.jpg")
      );
      expect(UploadImage).toHaveProperty("messagem" && "image");
      registeredCustomerImagem = UploadImage.image;
    });
    it("• ListImages()", async () => {
      const ListImage = await imagemController.ListImages();
      expect(ListImage[0].url == registeredCustomerImagem.url);
      expect(ListImage[0].createAt == registeredCustomerImagem.createAt);
    });
    it("• ListImageById()", async () => {
      const ListImage = await imagemController.ListImageByID(
        registeredCustomerImagem._id
      );
      expect(ListImage.url == registeredCustomerImagem.url);
      expect(ListImage.createAt == registeredCustomerImagem.createAt);
    });
    it("• deleteImage()", async () => {
      const DeleteImage = await imagemController.deleteImage(
        registeredCustomerImagem._id
      );
      expect(DeleteImage).toHaveProperty("messagem");
    });
  });
});
