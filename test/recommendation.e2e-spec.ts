import { CacheModule, INestApplication } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import {
  Recommendation,
  RrecommendationSchema,
} from "src/componentRecommendation/Schema/Rrecommendation.schema";
import * as request from "supertest";
import { RecommendationController } from "src/componentRecommendation/recommendation.controller";
import { RecommendationService } from "src/componentRecommendation/recommendation.service";
import { ImagemSchema, imagem } from "src/image/Schema/image.schema";
import { Product, ProductSchema } from "src/product/Schema/product.schema";
import { ProductServices } from "src/product/product.service";
import {
  Provider,
  ProviderSchema,
} from "src/providers/Schema/providers.schema";
import { UserSchema, Users } from "src/users/Schema/user.schema";
import { UserService } from "src/users/user.service";
import { UserController } from "src/users/users.controller";
import { AuthModule } from "src/auth/auth.module";
import { Order, OrderSchema } from "src/order/Schema/order.schema";
import { QueueCacheService } from "src/queues/jobs/queue.cache.service";
import { ImageService } from "src/image/image.service";
import { OrderService } from "src/order/order.service";
import { ProviderService } from "src/providers/providers.service";
const urlConfig = require("./globalConfig.json");
describe("Recommendation", () => {
  let app: INestApplication;
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
      controllers: [RecommendationController, UserController],
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
  let RecommendationCreated;
  let userCreated;
  it("• /cadastrar-recomendacao", async () => {
    const acessToke = (
      await request(app.getHttpServer())
        .post("/auth/login-app")
        .send({
          client_id: String(process.env.clientId),
          client_secret: String(process.env.clientSecret),
        })
    ).body.access_token;
    const _idUser = await request(app.getHttpServer())
      .post("/cadastrar-cliente")
      .auth(String(acessToke), {
        type: "bearer",
      })
      .send({
        cpf: "909.068.780-71",
        nome: "TDD user.controller",
        login: {
          email: "test@outlook.com",
          password: "test123456",
          isAdmin: true,
        },
        dataNascimento: "20/20/2000",
        sexo: "M",
        cep: "20321-000",
        endereco: "Rua João do Test",
        imagemPerfil: null,
        dataCadastro: new Date().toISOString(),
      })
      .expect("Content-Type", /json/)
      .expect(201);
    userCreated = _idUser.body.user;
    const recommendation = {
      click_calcados: 1,
      click_equipamentos: 1,
      click_roupas: 1,
      click_suplementos: 1,
      user: _idUser.body.user._id,
    };
    const CreateRecommendation = await request(app.getHttpServer())
      .post("/cadastrar-recomendacao")
      .auth(String(acessToke), {
        type: "bearer",
      })
      .send(recommendation)
      .expect("Content-Type", /json/)
      .expect(201);
    RecommendationCreated = CreateRecommendation.body.recommedation;
    expect(CreateRecommendation.body).toHaveProperty(
      "messagem" && "recommedation"
    );
  });
  it("• /listar-recomendacoes", async () => {
    const acessToke = (
      await request(app.getHttpServer())
        .post("/auth/login-app")
        .send({
          client_id: String(process.env.clientId),
          client_secret: String(process.env.clientSecret),
        })
    ).body.access_token;
    return request(app.getHttpServer())
      .get("/listar-recomendacoes")
      .auth(String(acessToke), {
        type: "bearer",
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(Array);
  });
  it("• /listar-recomendacao/:id", async () => {
    const acessToke = (
      await request(app.getHttpServer())
        .post("/auth/login-app")
        .send({
          client_id: String(process.env.clientId),
          client_secret: String(process.env.clientSecret),
        })
    ).body.access_token;
    return request(app.getHttpServer())
      .get(`/listar-recomendacao/${RecommendationCreated._id}`)
      .auth(String(acessToke), {
        type: "bearer",
      })
      .expect(200)
      .expect(Object);
  });
  it("• /atualizar-recomendacao/:id", async () => {
    const acessToke = (
      await request(app.getHttpServer())
        .post("/auth/login-app")
        .send({
          client_id: String(process.env.clientId),
          client_secret: String(process.env.clientSecret),
        })
    ).body.access_token;
    return await request(app.getHttpServer())
      .put(`/atualizar-recomendacao/${RecommendationCreated._id}`)
      .auth(String(acessToke), {
        type: "bearer",
      })
      .send({
        click_calcados: 2,
        click_equipamentos: 2,
        click_roupas: 2,
        click_suplementos: 2,
        user: userCreated._id,
      })
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("• /recomendacao/:id", async () => {
    const acessToke = (
      await request(app.getHttpServer())
        .post("/auth/login-app")
        .send({
          client_id: String(process.env.clientId),
          client_secret: String(process.env.clientSecret),
        })
    ).body.access_token;
    return request(app.getHttpServer())
      .get(`/recomendacao/${RecommendationCreated._id}`)
      .auth(String(acessToke), {
        type: "bearer",
      })
      .expect(200)
      .expect(Object);
  });
  it("• /deletar-recomendacao/:id", async () => {
    const acessToke = (
      await request(app.getHttpServer())
        .post("/auth/login-app")
        .send({
          client_id: String(process.env.clientId),
          client_secret: String(process.env.clientSecret),
        })
    ).body.access_token;
    const DeleteRecommedation = await request(app.getHttpServer())
      .delete(`/deletar-recomendacao/${RecommendationCreated._id}`)
      .auth(String(acessToke), {
        type: "bearer",
      })
      .expect(200);

    expect(DeleteRecommedation.body).toHaveProperty("messagem");
  });
});
