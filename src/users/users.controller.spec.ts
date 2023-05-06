import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./users.controller";
import { UserService } from "./user.service";
import { Users, UserSchema } from "./Schema/user.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { imagem, ImagemSchema } from "../image/Schema/image.schema";
import { UpdateUserDTO } from "./dto/updateUser.dto";
const urlConfig = require("../globalConfig.json");
describe("UserController", () => {
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
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

    userController = app.get<UserController>(UserController);
  });
  describe("👨‍💻 Methods:", () => {
    const client: Users = {
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
    };
    let registeredCustomer;
    it("• run the method CreateUser()", async () => {
      const CreateUser = await userController.CreateUser(client);
      expect(CreateUser).toHaveProperty(
        "messagem" && "registeredSuccess" && "user"
      );
      const clientId = CreateUser.user as any;
      registeredCustomer = clientId;
    });
    it("• run the method ListUsers()", async () => {
      const ListUsers = await userController.ListUsers();
      expect(ListUsers);
    });
    it("• run the method SearchUserById()", async () => {
      const _id = registeredCustomer._id;
      const searchUserById = await userController.SearchUserById(_id);
      expect(searchUserById.cpf == registeredCustomer.cpf);
      expect(searchUserById.login.email == registeredCustomer.login.email);
      expect(
        searchUserById.login.password == registeredCustomer.login.password
      );
      expect(
        searchUserById.dataNascimento == registeredCustomer.dataNascimento
      );
      expect(searchUserById.sexo == registeredCustomer.sexo);
      expect(searchUserById.cep == registeredCustomer.cep);
      expect(searchUserById.endereco == registeredCustomer.endereco);
      expect(searchUserById.imagemPerfil == null);
      expect(searchUserById);
    });
    it("• run the method UpdateUserById()", async () => {
      const _id = registeredCustomer._id;
      const newClient: UpdateUserDTO = {
        _id: _id,
        cpf: "466.773.520-13",
        nome: "TDD user.controller",
        login: {
          email: "test@outlook.com",
          password: registeredCustomer.login.password,
          isAdmin: true,
        },
        dataNascimento: "20/20/2000",
        sexo: "M",
        cep: "20321-000",
        endereco: "Rua João do Test",
        imagemPerfil: null,
      };
      const UpdateUser = await userController.UpdateUserById(_id, newClient);
      expect(UpdateUser).toHaveProperty("messagem");
      expect(UpdateUser).toHaveProperty("user");
      expect(UpdateUser.user.cpf == "466.773.520-13");
      expect(UpdateUser.user.cpf != "909.068.780-71");
      expect(UpdateUser.user.login.email == "test@outlook.com");
      expect(
        UpdateUser.user.login.password == registeredCustomer.login.password
      );
      expect(UpdateUser.user.dataNascimento == "20/20/2000");
      expect(UpdateUser.user.sexo == "M");
      expect(UpdateUser.user.cep == "20321-000");
      expect(UpdateUser.user.endereco == "Rua João do Test");
      expect(UpdateUser.user.imagemPerfil == null);
    });
    it("• run the method SingIn()", async () => {
      const login = {
        email: "test@outlook.com",
        password: "test123456",
      };
      const SingIn = await userController.SingIn(login);
      expect(SingIn).toHaveProperty(
        "result" && "emailExists" && "emailAndPassword"
      );
      expect(SingIn.result.cpf == "466.773.520-13");
      expect(SingIn.result.login.email == "test@outlook.com");
      expect(SingIn.result.login.password == registeredCustomer.login.password);
      expect(SingIn.result.dataNascimento == "20/20/2000");
      expect(SingIn.result.sexo == "M");
      expect(SingIn.result.cep == "20321-000");
      expect(SingIn.result.endereco == "Rua João do Test");
      expect(SingIn.result.imagemPerfil == null);
    });
    it("• run the method UpdatePassowdLogin() - just password change", async () => {
      const _id = registeredCustomer._id;
      const updatePassword = {
        email: "test@outlook.com",
        newEmail: undefined,
        OldPassword: "test123456",
        newPassoWord: "test5678910",
        isAdmin: true,
      };
      const updatePasswordLogin = await userController.UpdatePassowdLogin(
        _id,
        updatePassword
      );
      expect(updatePasswordLogin).toHaveProperty("messagem" && "user");
      expect(
        updatePasswordLogin.user.login.password !==
          registeredCustomer.login.password
      );
    });
    it("• run the method UpdatePassowdLogin() - just email change", async () => {
      const _id = registeredCustomer._id;
      const updatePassword = {
        email: "test@outlook.com",
        newEmail: "test@outlook.com",
        OldPassword: "test5678910",
        newPassoWord: undefined,
        isAdmin: true,
      };
      const updatePasswordLogin = await userController.UpdatePassowdLogin(
        _id,
        updatePassword
      );
      expect(updatePasswordLogin).toHaveProperty("messagem" && "user");
      expect(
        updatePasswordLogin.user.login.email !== registeredCustomer.login.email
      );
    });
    it("• run the method DeleteUserById()", async () => {
      const _id = registeredCustomer._id;
      const login = {
        email: "test@outlook.com",
        password: "test5678910",
      };
      const DeleteUserById = await userController.DeleteUserById(_id, login);
      expect(DeleteUserById).toHaveProperty("messagem");
    });
  });
});