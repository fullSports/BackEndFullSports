import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema, Users } from "src/users/Schema/user.schema";
import { ImagemSchema, imagem } from "src/image/Schema/image.schema";
import { UserController } from "src/users/users.controller";
import { UserService } from "src/users/user.service";
import {
  Recommendation,
  RrecommendationSchema,
} from "src/componentRecommendation /Schema/Rrecommendation.schema";
import { Product, ProductSchema } from "src/product/Schema/product.schema";
import {
  Provider,
  ProviderSchema,
} from "src/providers/Schema/providers.schema";
import { RecommendationService } from "src/componentRecommendation /recommendation.service";
import { ProductServices } from "src/product/product.service";
import { RecommendationController } from "src/componentRecommendation /recommendation.controller";
import { AuthModule } from "src/auth/auth.module";
const urlConfig = require("./globalConfig.json");
describe("Users", () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(urlConfig.mongoUri),
        MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
        MongooseModule.forFeature([
          { name: imagem.name, schema: ImagemSchema },
        ]),
        MongooseModule.forFeature([
          { name: Recommendation.name, schema: RrecommendationSchema },
        ]),
        MongooseModule.forFeature([
          { name: Product.name, schema: ProductSchema },
        ]),
        MongooseModule.forFeature([
          { name: Provider.name, schema: ProviderSchema },
        ]),
        AuthModule,
      ],
      controllers: [UserController, RecommendationController],
      providers: [UserService, RecommendationService, ProductServices],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  let ID;
  const client = {
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
  };
  it("• /listar-clientes (GET)", async () => {
    const acessToke = (
      await request(app.getHttpServer())
        .post("/auth/login-app")
        .send({
          clientID: String(process.env.clientID),
          clientSecret: String(process.env.clientSecret),
        })
    ).body.access_token;
    return request(app.getHttpServer())
      .get("/listar-clientes")
      .auth(String(acessToke), {
        type: "bearer",
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(Array);
  });
  it("• /cadastrar-cliente (POST)", async () => {
    const acessToke = (
      await request(app.getHttpServer())
        .post("/auth/login-app")
        .send({
          clientID: String(process.env.clientID),
          clientSecret: String(process.env.clientSecret),
        })
    ).body.access_token;

    const RegisterUsers = await request(app.getHttpServer())
      .post("/cadastrar-cliente")
      .auth(String(acessToke), {
        type: "bearer",
      })
      .send(client)
      .expect(201);
    expect(RegisterUsers.body).toHaveProperty("user" && "messagem");
    ID = RegisterUsers.body.user._id;
    return RegisterUsers;
  });
  it("• /listar-cliente/:id (GET)", async () => {
    const acessToke = (
      await request(app.getHttpServer())
        .post("/auth/login-app")
        .send({
          clientID: String(process.env.clientID),
          clientSecret: String(process.env.clientSecret),
        })
    ).body.access_token;
    const ListUsersID = await request(app.getHttpServer())
      .get(`/listar-cliente/${ID}`)
      .auth(String(acessToke), {
        type: "bearer",
      })
      .expect(200)
      .expect(Object);
    return ListUsersID;
  });
  it("• /atualizar-cliente/:id", async () => {
    const acessToke = (
      await request(app.getHttpServer())
        .post("/auth/login-app")
        .send({
          clientID: String(process.env.clientID),
          clientSecret: String(process.env.clientSecret),
        })
    ).body.access_token;
    const newClient = {
      cpf: "466.773.520-13",
      //   nome: "TDD user.controller",
      //   dataNascimento: "20/20/2000",
      //   sexo: "M",
      //   cep: "20321-000",
      //   endereco: "Rua João do Test",
    };
    const updateUser = await request(app.getHttpServer())
      .put(`/atualizar-cliente/${ID}`)
      .auth(String(acessToke), {
        type: "bearer",
      })
      .send(newClient)
      .expect(200)
      .expect(Object);

    expect(updateUser.body.user.cpf !== client.cpf);
    expect(updateUser.body.user.nome == client.nome);
  });
  it("• /realizar-login (POST ) ", async () => {
    const acessToke = (
      await request(app.getHttpServer())
        .post("/auth/login-app")
        .send({
          clientID: String(process.env.clientID),
          clientSecret: String(process.env.clientSecret),
        })
    ).body.access_token;
    const SingIn = await request(app.getHttpServer())
      .post("/realizar-login")
      .auth(String(acessToke), {
        type: "bearer",
      })
      .send({
        email: client.login.email,
        password: client.login.password,
      })
      .expect(Object);
    expect(SingIn.body).toHaveProperty("result");
    expect(SingIn.body.emailExists && SingIn.body.emailAndPassword).toBe(true);
  });

  it("• /atualizar-login/:id (PUT)- update password ", async () => {
    const acessToke = (
      await request(app.getHttpServer())
        .post("/auth/login-app")
        .send({
          clientID: String(process.env.clientID),
          clientSecret: String(process.env.clientSecret),
        })
    ).body.access_token;
    const updateLogin = await request(app.getHttpServer())
      .put(`/atualizar-login/${ID}`)
      .auth(String(acessToke), {
        type: "bearer",
      })
      .send({
        email: client.login.email,
        OldPassword: client.login.password,
        newPassoWord: "test5678910",
        isAdmin: false,
      })
      .expect(Object)
      .expect(200);
    return updateLogin;
  });
  it("• /atualizar-login/:id (PUT)-- update email and isAdmin", async () => {
    const acessToke = (
      await request(app.getHttpServer())
        .post("/auth/login-app")
        .send({
          clientID: String(process.env.clientID),
          clientSecret: String(process.env.clientSecret),
        })
    ).body.access_token;
    const updateLogin = await request(app.getHttpServer())
      .put(`/atualizar-login/${ID}`)
      .auth(String(acessToke), {
        type: "bearer",
      })
      .send({
        email: client.login.email,
        newEmail: "testteste@gmail.com",
        OldPassword: "test5678910",
        isAdmin: true,
      })
      .expect(Object)
      .expect(200);
    expect(updateLogin.body.user.email !== client.login.email);
    expect(updateLogin.body.user.isAdmin !== client.login.isAdmin);
  });

  it("• /deletar-cleinte/:id", async () => {
    const acessToke = (
      await request(app.getHttpServer())
        .post("/auth/login-app")
        .send({
          clientID: String(process.env.clientID),
          clientSecret: String(process.env.clientSecret),
        })
    ).body.access_token;
    const deletedUser = await request(app.getHttpServer())
      .delete(`/deletar-cliente/${ID}`)
      .auth(String(acessToke), {
        type: "bearer",
      })
      .send({
        email: "testteste@gmail.com",
        password: "test5678910",
      })
      .expect(200);
    expect(deletedUser.body).toHaveProperty("messagem");
    return deletedUser;
  });
});
