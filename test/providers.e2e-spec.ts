import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { MongooseModule } from "@nestjs/mongoose";
import {
  Provider,
  ProviderSchema,
} from "src/providers/Schema/providers.schema";
import { ProviderController } from "src/providers/providers.controller";
import { ProviderService } from "src/providers/providers.service";
import { AuthModule } from "src/auth/auth.module";
const urlConfig = require("./globalConfig.json");
describe("Providers", () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(urlConfig.mongoUri),
        MongooseModule.forFeature([
          { name: Provider.name, schema: ProviderSchema },
        ]),
        AuthModule,
      ],
      controllers: [ProviderController],
      providers: [ProviderService],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  let ID = String;
  const IProvider = {
    cnpj: "40.386.172/0001-60",
    nomeEmpresa: "TDD S.A",
    cep: "08452-000",
    endereco: "Rua joão do Teste",
  };

  it("• /listar-fornecedores (GET)", async () => {
    const acessToke = (
      await request(app.getHttpServer())
        .post("/auth/login-app")
        .send({
          client_id: String(process.env.clientId),
          client_secret: String(process.env.clientSecret),
        })
    ).body.access_token;
    const ListProviders = await request(app.getHttpServer())
      .get("/listar-fornecedores")
      .auth(String(acessToke), {
        type: "bearer",
      })
      .expect(200)
      .expect(Array);
    return ListProviders;
  });

  it("• /cadastrar-fornecedor (POST)", async () => {
    const acessToke = (
      await request(app.getHttpServer())
        .post("/auth/login-app")
        .send({
          client_id: String(process.env.clientId),
          client_secret: String(process.env.clientSecret),
        })
    ).body.access_token;
    const createdProvider = await request(app.getHttpServer())
      .post("/cadastrar-fornecedor")
      .auth(String(acessToke), {
        type: "bearer",
      })
      .send(IProvider)
      .expect(201);
    ID = createdProvider.body.provider._id;
    expect(createdProvider.body).toHaveProperty(
      "provider" && "messagem" && "registeredSuccess"
    );
    expect(createdProvider.body.registeredSuccess).toBe(true);
    return createdProvider;
  });

  it("• /listar-fornecedor/:id (GET)", async () => {
    const acessToke = (
      await request(app.getHttpServer())
        .post("/auth/login-app")
        .send({
          client_id: String(process.env.clientId),
          client_secret: String(process.env.clientSecret),
        })
    ).body.access_token;
    const ListProviderID = await request(app.getHttpServer())
      .get(`/listar-fornecedor/${ID}`)
      .auth(String(acessToke), {
        type: "bearer",
      })
      .expect(200)
      .expect(Object);
    return ListProviderID;
  });

  it("• /atualizar-fornecedor/:id (PUT)", async () => {
    const acessToke = (
      await request(app.getHttpServer())
        .post("/auth/login-app")
        .send({
          client_id: String(process.env.clientId),
          client_secret: String(process.env.clientSecret),
        })
    ).body.access_token;
    const newProvider = {
      cnpj: "75.121.012/0001-73",
    };
    const updateProvider = await request(app.getHttpServer())
      .put(`/atualizar-fornecedor/${ID}`)
      .auth(String(acessToke), {
        type: "bearer",
      })
      .send(newProvider)
      .expect(200);
    expect(Object);
    expect(updateProvider.body).toHaveProperty("provider" && "messagem");
    expect(updateProvider.body.provider.cnpj !== IProvider.cnpj);
    return updateProvider;
  });

  it("• /deletar-fornecedor/:id (DELETE)", async () => {
    const acessToke = (
      await request(app.getHttpServer())
        .post("/auth/login-app")
        .send({
          client_id: String(process.env.clientId),
          client_secret: String(process.env.clientSecret),
        })
    ).body.access_token;
    const deleteProvider = await request(app.getHttpServer())
      .delete(`/deletar-fornecedor/${ID}`)
      .auth(String(acessToke), {
        type: "bearer",
      })
      .expect(200);
    expect(deleteProvider.body).toHaveProperty("messagem");
    return deleteProvider;
  });
});
