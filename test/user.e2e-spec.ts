import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema, Users } from "src/users/Schema/user.schema";
import { ImagemSchema, imagem } from "src/image/Schema/image.schema";
import { UserController } from "src/users/users.controller";
import { UserService } from "src/users/user.service";
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
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  let ID = String;
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
    expect(RegisterUsers.body).toHaveProperty("user" && "messagem");
    ID = RegisterUsers.body.user._id;
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

    expect(updateUser.body.user.cpf !== client.cpf);
    expect(updateUser.body.user.nome == client.nome);
  });
  it("• /realizar-login (POST ) ", async () => {
    const SingIn = await request(app.getHttpServer())
      .post("/realizar-login")
      .send({
        email: client.login.email,
        password: client.login.password,
      })
      .expect(Object);
    expect(SingIn.body).toHaveProperty("result");
    expect(SingIn.body.emailExists && SingIn.body.emailAndPassword).toBe(true);
  });

  it("• /atualizar-login/:id (PUT)- update password ", async () => {
    const updateLogin = await request(app.getHttpServer())
      .put(`/atualizar-login/${ID}`)
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
    const updateLogin = await request(app.getHttpServer())
      .put(`/atualizar-login/${ID}`)
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
    const deletedUser = await request(app.getHttpServer())
      .delete(`/deletar-cliente/${ID}`)
      .send({
        email: "testteste@gmail.com",
        password: "test5678910",
      })
      .expect(200);
    expect(deletedUser.body).toHaveProperty("messagem");
    return deletedUser;
  });
  afterAll(async () => {
    await app.close();
  });
});
