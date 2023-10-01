import { CacheModule, INestApplication } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { ImagemSchema, imagem } from "src/image/Schema/image.schema";
import { ImageController } from "src/image/image.controller";
import { ImageService } from "src/image/image.service";
import { AuthModule } from "src/auth/auth.module";
import {
  Provider,
  ProviderSchema,
} from "src/providers/Schema/providers.schema";
import { QueueCacheService } from "src/queues/jobs/queue.cache.service";
import { RecommendationService } from "src/componentRecommendation/recommendation.service";
import { OrderService } from "src/order/order.service";
import { ProviderService } from "src/providers/providers.service";
import { UserService } from "src/users/user.service";
import {
  Recommendation,
  RrecommendationSchema,
} from "src/componentRecommendation/Schema/Rrecommendation.schema";
import { Order, OrderSchema } from "src/order/Schema/order.schema";
import { UserSchema, Users } from "src/users/Schema/user.schema";
import * as request from "supertest";
import { Product, ProductSchema } from "src/product/Schema/product.schema";
import { ProductServices } from "src/product/product.service";
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
        AuthModule,
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
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it("• /imagem (POST)", async () => {
    const acessToke = (
      await request(app.getHttpServer())
        .post("/auth/login-app")
        .send({
          client_id: String(process.env.clientId),
          client_secret: String(process.env.clientSecret),
        })
    ).body.access_token;

    return await request(app.getHttpServer())
      .post("/imagem")
      .field("file", "img")
      .auth(String(acessToke), {
        type: "bearer",
      })
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
    const acessToke = (
      await request(app.getHttpServer())
        .post("/auth/login-app")
        .send({
          client_id: String(process.env.clientId),
          client_secret: String(process.env.clientSecret),
        })
    ).body.access_token;
    return request(app.getHttpServer())
      .get("/imagem")
      .auth(String(acessToke), {
        type: "bearer",
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(Array);
  });
  it("• /imagem/:id (GET)", async () => {
    const acessToke = (
      await request(app.getHttpServer())
        .post("/auth/login-app")
        .send({
          client_id: String(process.env.clientId),
          client_secret: String(process.env.clientSecret),
        })
    ).body.access_token;
    await request(app.getHttpServer())
      .get(`/imagem/${registerImage._id}`)
      .auth(String(acessToke), {
        type: "bearer",
      })
      .expect(200);
    expect(Object);
  });
  it("• /imagem/:id (DELETE)", async () => {
    const acessToke = (
      await request(app.getHttpServer())
        .post("/auth/login-app")
        .send({
          client_id: String(process.env.clientId),
          client_secret: String(process.env.clientSecret),
        })
    ).body.access_token;
    const deleteImage = await request(app.getHttpServer())
      .delete(`/imagem/${registerImage._id}`)
      .auth(String(acessToke), {
        type: "bearer",
      })
      .expect(200);
    expect(deleteImage.body).toHaveProperty("messagem");
    return deleteImage;
  });
});
