import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, Logger } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
describe("UserController", () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  var ID = String;
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
  it("• /listar-clientes (GET)", () => {
    return request(app.getHttpServer())
      .get("/listar-clientes")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(Array);
  });
  it("• /cadastrar-cliente (POST)", async () => {
    const RegisterUsers = await request(app.getHttpServer())
      .post("/cadastrar-cliente")
      .send(client)
      .expect(201);
    expect(RegisterUsers.body).toHaveProperty("usuario" && "messagem");
    ID = RegisterUsers.body.usuario._id;
    return RegisterUsers;
  });
  it("• /listar-cliente/:id (GET)", async () => {
    const ListUsersID = await request(app.getHttpServer())
      .get(`/listar-cliente/${ID}`)
      .expect(200)
      .expect(Object);
    return ListUsersID;
  });
  it("• /atualizar-cliente/:id", async () => {
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
      .send(newClient)
      .expect(200)
      .expect(Object);

    expect(updateUser.body.usuario.cpf !== client.cpf);
  });
  it("• /deletar-cleinte/:id", async () => {
    const deletedUser = await request(app.getHttpServer())
      .delete(`/deletar-cliente/${ID}`)
      .send({
        email: "test@outlook.com",
        password: "test123456",
      })
      .expect(200);
    expect(deletedUser.body).toHaveProperty("messagem");
  });
});
