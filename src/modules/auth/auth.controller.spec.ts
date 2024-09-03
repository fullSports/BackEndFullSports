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
const urlConfig = require("../../../globalConfig.json");
describe("AuthController", () => {
  let authController: AuthController;

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
  });

  describe("👨‍💻 MethodsAuth", () => {
    it("👨‍💻loginUser() ", async () => {
      const loginApp = await authController.LoginApp({
        client_id: String(process.env.clientId),
        client_secret: String(process.env.clientSecret),
      });
      expect(loginApp.access_token);
    });
  });
});
