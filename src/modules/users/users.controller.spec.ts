import { RecommendationService } from "@componentRecommendation/recommendation.service";
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
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
const urlConfig = require("../../../globalConfig.json");

describe("userController", () => {
  let usersController: UserController;
  let service: UserService;
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
      controllers: [UserController],
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

    usersController = app.get<UserController>(UserController);
    service = app.get<UserService>(UserService);
  });
  describe("ListUsers()", () => {
    const mockUsers: Users[] = mocks.users();
    it("should list all users when authenticated", async () => {
      jest.spyOn(service, "ListUsers").mockResolvedValue(mockUsers);
      const result = await usersController.ListUsers();
      expect(result).toEqual(mockUsers);
      expect(service.ListUsers).toHaveBeenCalled();
    });
    it("should handle service unavailability", async () => {
      jest
        .spyOn(service, "ListUsers")
        .mockRejectedValue(new Error("Service Unavailable"));
      await expect(usersController.ListUsers()).rejects.toThrow(
        "Service Unavailable"
      );
      expect(service.ListUsers).toHaveBeenCalled();
    });
  });
  describe("CreateUser()", () => {
    it("should return success message and user data when valid data is provided", async () => {
      const mockUsers: Users = mocks.users()[0];
      jest.spyOn(service, "RegisterUsers").mockResolvedValue(mockUsers);
      const { _id, ...createUserDto } = mockUsers;
      const result = await usersController.CreateUser(createUserDto);
      expect(result).toEqual({
        messagem: "usuario cadastrado com sucesso",
        registeredSuccess: true,
        user: mockUsers,
      });
      expect(service.RegisterUsers).toHaveBeenCalledWith(createUserDto);
    });
    it("should return error message when email is already registered", async () => {
      jest.spyOn(service, "RegisterUsers").mockResolvedValue(null);
      const mockUsers: Users = mocks.users()[0];
      const { _id, ...createUserDto } = mockUsers;
      const result = await usersController.CreateUser(createUserDto);
      expect(result).toEqual({
        messagem: "email de usuario já cadastrado",
        registeredSuccess: false,
      });
      expect(service.RegisterUsers).toHaveBeenCalledWith(createUserDto);
    });
  });
  describe("SearchUserById()", () => {
    it("should return user when id is valid", async () => {
      const mockUsers: Users = mocks.users()[0];
      jest.spyOn(service, "searchId").mockResolvedValue(mockUsers);
      const result: Users = await usersController.SearchUserById(mockUsers._id);
      expect(result).toEqual(mockUsers);
      expect(service.searchId).toHaveBeenCalledWith(mockUsers._id);
    });
    it("should return null when id does not exist", async () => {
      jest.spyOn(service, "searchId").mockResolvedValue(null);
      const result = await usersController.SearchUserById("999");
      expect(result).toBeNull();
      expect(service.searchId).toHaveBeenCalledWith("999");
    });
  });
  describe("UpdateUserById()", () => {
    it("should update user successfully when valid id and updateUserDTO are provided", async () => {
      const mockUsers: Users = mocks.users()[0];

      jest.spyOn(service, "updateUser").mockResolvedValue(mockUsers);
      const result = await usersController.UpdateUserById(mockUsers._id, {
        nome: "Updated User",
      });
      expect(service.updateUser).toHaveBeenCalledWith(mockUsers._id, {
        nome: "Updated User",
      });
      mockUsers.nome = "Updated User";
      expect(result).toEqual({
        user: mockUsers,
        messagem: "usuario atualizado com sucesso",
      });
    });
    it("should return undefined when user id does not exist", async () => {
      jest.spyOn(service, "updateUser").mockResolvedValue(null);
      const result = await usersController.UpdateUserById("nonexistent-id", {
        nome: "Updated Name",
      });
      expect(result).toBeUndefined();
      expect(service.updateUser).toHaveBeenCalledWith("nonexistent-id", {
        nome: "Updated Name",
      });
    });
  });
  describe("DeleteUserById()", () => {
    it("should successfully delete a user with valid ID and credentials", async () => {
      const mockUsers: Users = mocks.users()[0];
      jest
        .spyOn(service, "deleteUser")
        .mockResolvedValue({ message: "Usuário deletado com sucesso" });

      const { isAdmin, ...singInBody } = mockUsers.login;
      const result = await usersController.DeleteUserById(
        mockUsers._id,
        singInBody
      );
      expect(service.deleteUser).toHaveBeenCalledWith(
        mockUsers._id,
        singInBody
      );
      expect(result).toEqual({ message: "Usuário deletado com sucesso" });
    });
  });
  describe("UpdatePassowdLogin()", () => {
    it("should update user login successfully when valid id and body are provided", async () => {
      const mockUsers: Users = mocks.users()[0];
      jest.spyOn(service, "updatePassworUser").mockResolvedValue(mockUsers);

      const id = mockUsers._id;
      const updatePasswordBody = {
        email: mockUsers.login.email,
        OldPassword: "123",
        newPassoWord: "newPass123",
      };

      const result = await usersController.UpdatePassowdLogin(
        id,
        updatePasswordBody
      );

      expect(service.updatePassworUser).toHaveBeenCalledWith(
        id,
        updatePasswordBody
      );
      expect(result).toHaveProperty("messagem", "login atualizado com suceeso");
      expect(result).toHaveProperty("user");
    });
    it("should return an error when provided id does not exist in the database", async () => {
      jest
        .spyOn(service, "updatePassworUser")
        .mockRejectedValue(new Error("User not found"));
      const id = "nonexistent-id";
      const updatePasswordBody = {
        email: "test@example.com",
        OldPassword: "oldPass123",
        newPassoWord: "newPass123",
      };

      await expect(
        usersController.UpdatePassowdLogin(id, updatePasswordBody)
      ).rejects.toThrow("User not found");
      expect(service.updatePassworUser).toHaveBeenCalledWith(
        id,
        updatePasswordBody
      );
    });
  });
});
