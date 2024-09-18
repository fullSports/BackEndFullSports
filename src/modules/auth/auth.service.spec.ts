import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import { jwtConfig } from "./config/jwt.config";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UserService } from "@users/users.service";
import { RecommendationService } from "@componentRecommendation/recommendation.service";
import { ProductServices } from "@product/product.service";
import { ProviderModule } from "@providers/providers.module";
import { ProductModule } from "@product/product.module";
import { RecommendationModule } from "@componentRecommendation/recommendation.module";
import { ImageModule } from "@image/image.module";
import { UserModule } from "@users/users.module";
const urlConfig = require("../../../globalConfig.json");
describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(urlConfig.mongoUri),
        UserModule,
        ImageModule,
        RecommendationModule,
        ProductModule,
        ProviderModule,
        PassportModule,
        JwtModule.register(jwtConfig),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtStrategy,
        UserService,
        RecommendationService,
        ProductServices,
      ],
      exports: [AuthService],
    }).compile();
    service = app.get<AuthService>(AuthService);
  });
  describe("setAccessToken()", () => {
    it("should set the access token correctly when a valid token object is provided", async () => {
      const authService = service as any;
      const token = { access_token: "valid_token" };
      await authService.setAccessToken(token);
      expect(authService.access_token).toEqual(token);
    });
    it("should handle null or undefined token input gracefully", async () => {
      const authService = service as any;
      await authService.setAccessToken(null);
      expect(authService.access_token).toBeNull();
      await authService.setAccessToken(undefined);
      expect(authService.access_token).toBeUndefined();
    });
  });
  describe("getAccessToken()", () => {
    it("should return the access token when it is set", async () => {
      const authService = service as any;
      authService.access_token = "test_token";
      const result = await authService.getAccessToken();
      expect(result).toBe("test_token");
    });
    it("should return undefined if access token is not set", async () => {
      const result = await service.getAccessToken();
      expect(result).toBeUndefined();
    });
  });
  describe("validateApp()", () => {
    it("should return null when clientId does not match process.env.clientId", async () => {
      const result = await service.validateApp(
        "wrongClientId",
        "correctClientSecret"
      );
      expect(result).toBeNull();
    });
    it("should return null when clientId and clientSecret are empty", async () => {
      const result = await service.validateApp("", "");
      expect(result).toBeNull();
    });
  });
  describe("validateUserById", () => {
    it("should return true when userId is valid", async () => {
      process.env.clientId = "testClientId";
      process.env.clientSecret = "testClientSecret";
      const id = `${new Date().getUTCDate()}-${process.env.clientId}-${
        process.env.clientSecret
      }`;
      const hash = id
        .split("")
        .reduce(
          (hex, c) => hex + c.charCodeAt(0).toString(16).padStart(2, "0"),
          ""
        );

      expect(await service.validateUserById(hash)).toBe(true);
    });
    it("should return false when userId is empty", async () => {
      const userId = "";
      expect(await service.validateUserById(userId)).toBe(false);
    });
  });
});
