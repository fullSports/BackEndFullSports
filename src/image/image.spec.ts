import { Test, TestingModule } from "@nestjs/testing";
import { ImageController } from "./image.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ImagemSchema, imagem } from "./Schema/image.schema";
import { ImageService } from "./image.service";
import { ProductServices } from "src/product/product.service";
import { QueueCacheService } from "src/queues/jobs/queue.cache.service";
import { RecommendationService } from "src/componentRecommendation/recommendation.service";
import { OrderService } from "src/order/order.service";
import { ProviderService } from "src/providers/providers.service";
import { UserService } from "src/users/user.service";
import { Product, ProductSchema } from "src/product/Schema/product.schema";
import {
  Recommendation,
  RrecommendationSchema,
} from "src/componentRecommendation/Schema/Rrecommendation.schema";
import {
  Provider,
  ProviderSchema,
} from "src/providers/Schema/providers.schema";
import { Order, OrderSchema } from "src/order/Schema/order.schema";
import { UserSchema, Users } from "src/users/Schema/user.schema";
import { CacheModule } from "@nestjs/common";
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
          { name: Product.name, schema: ProductSchema },
          { name: imagem.name, schema: ImagemSchema },
          { name: Provider.name, schema: ProviderSchema },
          { name: Recommendation.name, schema: RrecommendationSchema },
          { name: Order.name, schema: OrderSchema },
          { name: Users.name, schema: UserSchema },
        ]),
        CacheModule.register({
          ttl: 999999,
          isGlobal: true,
        }),
      ],
      controllers: [ImageController],
      providers: [
        ProductServices,
        QueueCacheService,
        RecommendationService,
        ImageService,
        OrderService,
        ProviderService,
        UserService,
      ],
    }).compile();
    imagemController = app.get<ImageController>(ImageController);
  });
  describe("👨‍💻 MethodsImage:", () => {
    it("• uploudImage()", async () => {
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
