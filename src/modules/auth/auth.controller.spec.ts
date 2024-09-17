import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import { jwtConfig } from "./config/jwt.config";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UserService } from "@users/user.service";
import { RecommendationService } from "@componentRecommendation/recommendation.service";
import { ProductServices } from "@product/product.service";
import { ProviderModule } from "@providers/providers.module";
import { ProductModule } from "@product/product.module";
import { RecommendationModule } from "@componentRecommendation/recommendation.module";
import { ImageModule } from "@image/image.module";
import { UserModule } from "@users/users.module";
import { UnauthorizedException } from "@nestjs/common";
const urlConfig = require("../../../globalConfig.json");
describe("AuthController", () => {
  let authController: AuthController;
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
    authController = app.get<AuthController>(AuthController);
    service = app.get<AuthService>(AuthService);
  });

  describe("👨‍💻 AuthController", () => {
    describe("👨‍💻loginUser() ", () => {
      it("expect acess_token", async () => {
        process.env.clientId = "valid-client-id";
        process.env.clientSecret = "valid-client-secret";
        const loginApp = await authController.LoginApp({
          client_id: "valid-client-id",
          client_secret: "valid-client-secret",
        });
        expect(loginApp.access_token);
      });
      it("should return access token when client_id and client_secret are valid", async () => {
        jest.spyOn(service, "validateApp").mockResolvedValue({ id: "app-id" });
        jest.spyOn(service, "generateToken").mockResolvedValue(undefined);
        jest
          .spyOn(service, "getAccessToken")
          .mockResolvedValue({ access_token: "access-token" });
        process.env.clientId = "valid-client-id";
        process.env.clientSecret = "valid-client-secret";
        const body = {
          client_id: "valid-client-id",
          client_secret: "valid-client-secret",
        };

        const result = await authController.LoginApp(body);

        expect(service.validateApp).toHaveBeenCalledWith(
          "valid-client-id",
          "valid-client-secret"
        );
        expect(service.generateToken).toHaveBeenCalledWith({
          id: "app-id",
        });
        expect(service.getAccessToken).toHaveBeenCalled();
        expect(result).toStrictEqual({ access_token: "access-token" });
      });
      it("should throw UnauthorizedException when client_id and client_secret are invalid", async () => {
        jest.spyOn(service, "validateApp").mockResolvedValue(null);
        jest.spyOn(service, "generateToken");
        jest.spyOn(service, "getAccessToken");
        const body = {
          client_id: "invalid-client-id",
          client_secret: "invalid-client-secret",
        };
        await expect(authController.LoginApp(body)).rejects.toThrow(
          UnauthorizedException
        );
        expect(service.validateApp).toHaveBeenCalledWith(
          "invalid-client-id",
          "invalid-client-secret"
        );
        expect(service.generateToken).not.toHaveBeenCalled();
        expect(service.getAccessToken).not.toHaveBeenCalled();
      });
    });
  });
});
