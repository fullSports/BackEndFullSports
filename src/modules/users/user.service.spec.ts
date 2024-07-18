import { RecommendationService } from "@componentRecommendation/recommendation.service";
import { UserService } from "./user.service";
import { ProductServices } from "@product/product.service";
import { Users, UserSchema } from "./Schema/user.schema";
import { getModelToken, MongooseModule } from "@nestjs/mongoose";
import { RecommendationModule } from "@componentRecommendation/recommendation.module";
import { ProductModule } from "@product/product.module";
import { ProviderModule } from "@providers/providers.module";
import { ImageModule } from "@image/image.module";
import { Test, TestingModule } from "@nestjs/testing";
import { NotFoundException } from "@nestjs/common";
import { Mocks } from "@mocks/mocks";
import * as bcrypt from "bcrypt";
import { Recommendation } from "@componentRecommendation/Schema/Rrecommendation.schema";
import { RealizarLogin } from "./dto/SingIn.dto";
import { UpdatePasswordUser } from "./dto/updateLogin.dtp";
import { Types } from "mongoose";
const urlConfig = require("../../../globalConfig.json");

describe("userService", () => {
  let userService: UserService;
  const mocks = new Mocks();
  const mockMongo = {
    find: jest.fn(),
    skip: jest.fn(),
    limit: jest.fn(),
    sort: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
    exec: jest.fn(),
    select: jest.fn(),
    populate: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    setOptions: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(urlConfig.mongoUri),
        MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
        RecommendationModule,
        ProductModule,
        ProviderModule,
        ImageModule,
      ],
      providers: [
        UserService,
        RecommendationService,
        ProductServices,
        {
          provide: getModelToken(Users.name),
          useValue: mockMongo,
        },
        {
          provide: getModelToken(Recommendation.name),
          useValue: mockMongo,
        },
      ],
      exports: [MongooseModule],
    }).compile();

    userService = app.get<UserService>(UserService);
  });
  describe("ListUsers()", () => {
    it("should throw NotFoundException when no users are found", async () => {
      mockMongo.find = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue([]),
        }),
      });
      await expect(userService.ListUsers()).rejects.toThrow(NotFoundException);
    });
    it("should return a list of users when users exist in the database", async () => {
      const mockUsers: Users[] = mocks.users();
      mockMongo.find = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockReturnValue(mockUsers),
        }),
      });
      const result: Users[] = await userService.ListUsers();

      expect(result).toEqual(mockUsers);
      expect(mockMongo.find).toHaveBeenCalled();
      expect(mockMongo.find().populate).toHaveBeenCalledWith("imagemPerfil");
      expect(mockMongo.find().populate().exec).toHaveBeenCalled();
    });
  });
  describe("RegisterUsers()", () => {
    it("should throw NotFoundException when no users are create", async () => {
      mockMongo.create = jest.fn().mockResolvedValue(null);
      const createUser = {
        cpf: "123.456.789-00",
        nome: "John Doe",
        login: {
          email: "john.doe@example.com",
          password: "password123",
          isAdmin: false,
        },
        dataNascimento: "1990-01-01",
        sexo: "M",
        cep: "12345678",
        endereco: "123 Main St",
        imagemPerfil: null,
        dataCadastro: "",
      };
      await expect(userService.RegisterUsers(createUser)).rejects.toThrow(
        Error
      );
    });
    it("should register a new user when provided with valid data", async () => {
      mockMongo.create = jest.fn().mockResolvedValue({ _id: "12345" });
      const bcryptHashSpy = jest
        .spyOn(bcrypt, "hash")
        .mockResolvedValue("hashedPassword" as never);
      const createUser = {
        cpf: "123.456.789-00",
        nome: "John Doe",
        login: {
          email: "john.doe@example.com",
          password: "password123",
          isAdmin: false,
        },
        dataNascimento: "1990-01-01",
        sexo: "M",
        cep: "12345678",
        endereco: "123 Main St",
        imagemPerfil: null,
        dataCadastro: "",
      };
      const result = await userService.RegisterUsers(createUser);
      expect(bcryptHashSpy).toHaveBeenCalledWith("password123", 10);
      expect(mockMongo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          cpf: "123.456.789-00",
          nome: "John Doe",
          login: expect.objectContaining({
            email: "john.doe@example.com",
            password: "hashedPassword",
          }),
          dataNascimento: "1990-01-01",
          sexo: "M",
          cep: "12345678",
          endereco: "123 Main St",
          imagemPerfil: null,
        })
      );
      expect(result).toEqual(expect.objectContaining({ _id: "12345" }));
    });
    it("should return null when trying to register a user with an existing email", async () => {
      const mockUserModel = {
        create: jest.fn(),
      };
      const mockRecommendationService = {
        RegisterRecommedations: jest.fn(),
      };
      const mockUsers: Users[] = mocks.users();
      mockMongo.find = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockReturnValue(mockUsers),
        }),
      });
      jest.spyOn(userService, "ListUsers").mockResolvedValue(mockUsers);
      const createUser = mockUsers[0];
      const result = await userService.RegisterUsers(createUser);
      expect(result).toBeNull();
      expect(mockUserModel.create).not.toHaveBeenCalled();
      expect(
        mockRecommendationService.RegisterRecommedations
      ).not.toHaveBeenCalled();
    });
  });
  describe("searchId()", () => {
    it("should return user when ID exists", async () => {
      const mockUser = mocks.users()[0];
      mockMongo.findById = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockReturnValue(mockUser),
        }),
      });
      const result = await userService.searchId(mockUser["_id"]);
      expect(result).toEqual(mockUser);
      expect(mockMongo.findById).toHaveBeenCalledWith({ _id: mockUser["_id"] });
    });
    it("should throw NotFoundException when ID does not exist", async () => {
      mockMongo.findById = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockReturnValue(null),
        }),
      });
      await expect(userService.searchId("invalidUserId")).rejects.toThrow(
        NotFoundException
      );
      expect(mockMongo.findById).toHaveBeenCalledWith({ _id: "invalidUserId" });
    });
  });
  describe("updateUser()", () => {
    it("should update user with all fields provided", async () => {
      const userMocks = mocks.users()[0];
      const id = userMocks["_id"];
      const updateUserDTO = {
        _id: id,
        cpf: "123.456.789-00",
        nome: "Updated Name",
        login: {
          email: "updated@example.com",
          password: "hashedPassword",
          isAdmin: false,
        },
        dataNascimento: "2000-01-01",
        sexo: "M",
        cep: "12345678",
        endereco: "Updated Address",
        imagemPerfil: null,
      };
      const findByIDUser = userMocks;
      const updatedUser = {
        ...findByIDUser,
        ...updateUserDTO,
        login: findByIDUser.login,
        dataCadastro: findByIDUser.dataCadastro,
      };
      mockMongo.findById = jest.fn().mockReturnValue(findByIDUser);
      mockMongo.findByIdAndUpdate = jest.fn().mockReturnValue(updatedUser);
      const result = await userService.updateUser(id, updateUserDTO);
      expect(result).toEqual(updatedUser);
    });
    it("should throw NotFoundException if user with given id does not exist", async () => {
      const userMocks = mocks.users()[0];
      const id = userMocks["_id"];
      const updateUserDTO = {
        _id: id,
        cpf: "123.456.789-00",
        nome: "Updated Name",
        login: {
          email: "updated@example.com",
          password: "hashedPassword",
          isAdmin: false,
        },
        dataNascimento: "2000-01-01",
        sexo: "M",
        cep: "12345678",
        endereco: "Updated Address",
        imagemPerfil: null,
      };

      mockMongo.findByIdAndUpdate = jest.fn().mockReturnValue(null);
      await expect(userService.updateUser(id, updateUserDTO)).rejects.toThrow(
        NotFoundException
      );
    });
  });
  describe("deleteUser()", () => {
    it("should delete user when valid email and password are provided", async () => {
      mockMongo.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({
          login: { email: "test@example.com", password: "hashedpassword" },
          imagemPerfil: "60d0fe4f5311236168a109ca", // Example ObjectId string
          _id: "60d0fe4f5311236168a109cb", // Example ObjectId string
        }),
      });
      mockMongo.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(true),
      });
      jest
        .spyOn(RecommendationService.prototype, "listRecommedations")
        .mockResolvedValue([
          { user: "60d0fe4f5311236168a109cb", _id: "recommendationId" },
        ] as any);
      const bcryptCompareSync = jest
        .spyOn(bcrypt, "compareSync")
        .mockReturnValue(true);
      const result = await userService.deleteUser("60d0fe4f5311236168a109cb", {
        email: "test@example.com",
        password: "password",
      });

      expect(result).toEqual({ message: "Usuário deletado com sucesso" });
      expect(mockMongo.findById).toHaveBeenCalledWith(
        "60d0fe4f5311236168a109cb"
      );
      expect(mockMongo.findByIdAndDelete).toHaveBeenCalledWith(
        "60d0fe4f5311236168a109cb"
      );
    });
    it("should return error message when email does not match user's email", async () => {
      mockMongo.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({
          login: {
            email: "different@example.com",
            password: "hashedpassword",
          },
        }),
      });

      const result = await userService.deleteUser("userId", {
        email: "test@example.com",
        password: "password",
      });

      expect(result).toEqual({ message: "email ou senha invalida" });
      expect(mockMongo.findById).toHaveBeenCalledWith("userId");
    });
  });
  describe("signIn()", () => {
    it("should return user object with emailExists and emailAndPassword set to true when valid email and password are provided", async () => {
      const mockUser = {
        login: {
          email: "test@example.com",
          password: await bcrypt.hash("validPassword", 10),
        },
      };
      const mockListUsers = jest.fn().mockResolvedValue([mockUser]);
      userService.ListUsers = mockListUsers;

      const realizarLogin = new RealizarLogin();
      realizarLogin.email = "test@example.com";
      realizarLogin.password = "validPassword";

      const result = await userService.signIn(realizarLogin);

      expect(result).toEqual({
        result: mockUser,
        emailExists: true,
        emailAndPassword: true,
      });
    });
    it("should return error message when email and password fields are empty", async () => {
      const realizarLogin = new RealizarLogin();
      realizarLogin.email = "";
      realizarLogin.password = "";

      const result = await userService.signIn(realizarLogin);

      expect(result).toEqual({
        message: "email não encontrado",
        emailExists: false,
        emailAndPassword: false,
      });
    });
  });
  describe("updatePassworUser", () => {
    it("should update password when old password is correct", async () => {
      const id = new Types.ObjectId().toString();
      const updatePasswordBody: UpdatePasswordUser = {
        email: "test@example.com",
        OldPassword: "oldPassword123",
        newPassoWord: "newPassword123",
        isAdmin: true,
        newEmail: "test2@example.com",
      };
      jest.spyOn(userService, "ListUsers").mockResolvedValue([
        {
          cpf: "123456789",
          cep: "tweasd",
          dataCadastro: "09-06-2024",
          dataNascimento: "09/06/2021",
          endereco: "asdasds",
          imagemPerfil: null,
          nome: "Test User",
          sexo: "M",
          login: {
            isAdmin: true,
            email: "test@example.com",
            password: bcrypt.hashSync("oldPassword123", 10),
          },
        },
      ]);
      mockMongo.findById.mockReturnValue({
        cpf: "123456789",
        nome: "Test User",
        login: {
          email: "test@example.com",
          password: bcrypt.hashSync("oldPassword123", 10),
          isAdmin: false,
        },
        dataNascimento: "1990-01-01",
        sexo: "M",
        cep: "12345-678",
        endereco: "Test Address",
        imagemPerfil: null,
      });
      const hash = bcrypt.hashSync("newPassword123", 10);
      mockMongo.findByIdAndUpdate.mockReturnValue({
        cpf: "123456789",
        nome: "Test User",
        login: {
          email: "test2@example.com",
          password: hash,
          isAdmin: true,
        },
        dataNascimento: "1990-01-01",
        sexo: "M",
        cep: "12345-678",
        endereco: "Test Address",
        imagemPerfil: null,
      });
      const result = await userService.updatePassworUser(
        id,
        updatePasswordBody
      );
      expect(result["login"].password).toBe(hash);
    });
    it("should return error message when email is not found", async () => {
      const id = new Types.ObjectId().toString();
      const updatePasswordBody: UpdatePasswordUser = {
        email: "nonexistent@example.com",
        OldPassword: "oldPassword123",
        newPassoWord: "newPassword123",
        isAdmin: true,
        newEmail: "nonexistent@example.com",
      };
      jest.spyOn(userService, "ListUsers").mockResolvedValue([]);
      const result = await userService.updatePassworUser(
        id,
        updatePasswordBody
      );
      expect(result).toEqual({
        message: "email ou senha incorretos",
        emailExists: false,
      });
    });
  });
});
