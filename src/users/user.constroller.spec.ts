import { ObjectIdentifierFilterSensitiveLog } from "@aws-sdk/client-s3";
import { Logger } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { Model } from "mongoose";
import { UsersDocument } from "./Schema/user.schema";
import { UserService } from "./user.service";
import { UserController } from "./users.controller";
describe("UserController", () => {
  let userController: UserController;
  let useService: UserService;
  let userModel: Model<UsersDocument>;
  beforeEach(() => {
    useService = new UserService(userModel);
    userController = new UserController(useService);
  });
  var Id = String;
  it("•Execulta ListUsers()", async () => {
    const listUser = userController.ListUsers();
    expect(userController.ListUsers());
  });
  // it("•Execultar CreateUser()", async () => {
  //   let newUser = {
  //     _id: Object,
  //     cpf: "643.968.790-59",
  //     nome: "TDD user.controller",
  //     login: {
  //       email: "TEsteCriacaoUser@outlook.com",
  //       password: "teste",
  //       isAdmin: true,
  //     },
  //     dataNascimento: "20/20/2000",
  //     sexo: "M",
  //     cep: "20321-000",
  //     endereco: "Rua João do Test",
  //     imagemPerfil: null,
  //     dataCadastro: new Date(),
  //   };
  //   const createdUser = userController.CreateUser(newUser);
  //   expect((await createdUser).registeredSuccess).toBe(true);

  // });
});
