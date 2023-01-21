import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../src/app.module";

describe("Providers", () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  var ID = String;
  const Provider = {
    cnpj: "71.476.474/0001-52",
    nomeEmpresa: "TDD S.A",
    cep: "08452-000",
    endereco: "Rua joão do Teste",
  };

  it("• /listar-fornecedores (GET)", async () => {
    const ListProviders = await request(app.getHttpServer())
      .get("/listar-fornecedores")
      .expect(200)
      .expect(Array);
    return ListProviders;
  });

  it("• /cadastrar-fornecedor (POST)", async () => {
    const createdProvider = await request(app.getHttpServer())
      .post("/cadastrar-fornecedor")
      .send(Provider)
      .expect(201);
    ID = createdProvider.body.provider._id;
    expect(createdProvider.body).toHaveProperty(
      "provider" && "messagem" && "registeredSuccess"
    );
    expect(createdProvider.body.registeredSuccess).toBe(true);
    return createdProvider;
  });

  it("• /listar-fornecedor/:id (GET)", async () => {
    const ListProviderID = await request(app.getHttpServer())
      .get(`/listar-fornecedor/${ID}`)
      .expect(200)
      .expect(Object);
    return ListProviderID;
  });

  it("• /atualizar-fornecedor/:id (PUT)", async () => {
    const newProvider = {
      cnpj: "59.343.654/0001-60",
    };
    const updateProvider = await request(app.getHttpServer())
      .put(`/atualizar-fornecedor/${ID}`)
      .send(newProvider)
      .expect(200);
    expect(Object);
    expect(updateProvider.body).toHaveProperty("provider" && "messagem");
    expect(updateProvider.body.provider.cnpj !== Provider.cnpj);
    return updateProvider;
  });

  it("• /deletar-fornecedor/:id (DELETE)", async () => {
    const deleteProvider = await request(app.getHttpServer())
      .delete(`/deletar-fornecedor/${ID}`)
      .expect(200);
    expect(deleteProvider.body).toHaveProperty("messagem");
  });
});
