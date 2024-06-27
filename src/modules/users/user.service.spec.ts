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
import { populate } from "dotenv";
import { exec } from "child_process";
import { NotFoundException } from "@nestjs/common";
const urlConfig = require("../../../globalConfig.json");

describe("userService", () => {
  let userService: UserService;
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
      ],
      exports: [MongooseModule],
    }).compile();

    userService = app.get<UserService>(UserService);
  });
  describe("ListUsers()", () => {
    it("should return a list of users when users exist in the database", async () => {
      const mockUsers = [
        { _id: "1", nome: "User One", login: { email: "user1@example.com" } },
        { _id: "2", nome: "User Two", login: { email: "user2@example.com" } },
      ];
      mockMongo.find = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockReturnValue(mockUsers),
        }),
      });
      const result = await userService.ListUsers();

      expect(result).toEqual(mockUsers);
      expect(mockMongo.find).toHaveBeenCalled();
      expect(mockMongo.find().populate).toHaveBeenCalledWith("imagemPerfil");
      expect(mockMongo.find().populate().exec).toHaveBeenCalled();
    });
    it("should throw NotFoundException when the database connection fails", async () => {
      mockMongo.find = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockRejectedValue(new NotFoundException()),
        }),
      });
      await expect(userService.ListUsers()).rejects.toThrow(NotFoundException);
    });
  });
  describe("RegisterUsers()", () => {});
});
