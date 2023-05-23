import { INestApplication } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import {
  Recommendation,
  RrecommendationSchema,
} from "src/componentRecommendation /Schema/Rrecommendation.schema";
import * as request from "supertest";
import { RecommendationController } from "src/componentRecommendation /recommendation.controller";
import { RecommendationService } from "src/componentRecommendation /recommendation.service";
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
const urlConfig = require("./globalConfig.json");
describe("Recommendation", () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(urlConfig.mongoUri),
        MongooseModule.forFeature([
          { name: Recommendation.name, schema: RrecommendationSchema },
        ]),
        MongooseModule.forFeature([
          { name: Product.name, schema: ProductSchema },
        ]),
        MongooseModule.forFeature([
          { name: imagem.name, schema: ImagemSchema },
        ]),
        MongooseModule.forFeature([
          { name: Provider.name, schema: ProviderSchema },
        ]),
        MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
      ],
      controllers: [RecommendationController, UserController],
      providers: [RecommendationService, ProductServices, UserService],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  let RecommendationCreated;
  let userCreated;
  it("• /cadastrar-recomendacao", async () => {
    const _idUser = await request(app.getHttpServer())
      .post("/cadastrar-cliente")
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
      .send(recommendation)
      .expect("Content-Type", /json/)
      .expect(201);
    RecommendationCreated = CreateRecommendation.body.recommedation;
    expect(CreateRecommendation.body).toHaveProperty(
      "messagem" && "recommedation"
    );
  });
  it("• /listar-recomendacoes", async () => {
    return request(app.getHttpServer())
      .get("/listar-recomendacoes")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(Array);
  });
  it("• /listar-recomendacao/:id", async () => {
    return request(app.getHttpServer())
      .get(`/listar-recomendacao/${RecommendationCreated._id}`)
      .expect(200)
      .expect(Object);
  });
  it("• /atualizar-recomendacao/:id", async () => {
    return await request(app.getHttpServer())
      .put(`/atualizar-recomendacao/${RecommendationCreated._id}`)
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
    return request(app.getHttpServer())
      .get(`/recomendacao/${RecommendationCreated._id}`)
      .expect(200)
      .expect(Array);
  });
  it("• /deletar-recomendacao/:id", async () => {
    const DeleteRecommedation = await request(app.getHttpServer())
      .delete(`/deletar-recomendacao/${RecommendationCreated._id}`)
      .expect(200);

    expect(DeleteRecommedation.body).toHaveProperty("messagem");
  });
});
