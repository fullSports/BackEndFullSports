import { AuthController } from "@auth/auth.controller";
import { AuthService } from "@auth/auth.service";
import { jwtConfig } from "@auth/config/jwt.config";
import { JwtStrategy } from "@auth/strategies/jwt.strategy";
import { RecommendationModule } from "@componentRecommendation/recommendation.module";
import { RecommendationService } from "@componentRecommendation/recommendation.service";
import { ImageModule } from "@image/image.module";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import { ProductModule } from "@product/product.module";
import { ProductServices } from "@product/product.service";
import { ProviderModule } from "@providers/providers.module";
import { UserService } from "@users/user.service";
import { UserModule } from "@users/users.module";
import { JwtInjectionMiddleware } from "./jwt-injection.middleware";
const urlConfig = require("../../../../globalConfig.json");

describe("AuthController", () => {
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
        // Outros módulos necessários para o AuthModule
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
  it("should add authorization header when not present", () => {
    const jwtInjectionMiddleware = new JwtInjectionMiddleware(service);
    const req = {
      headers: {
        authorization: "Bearer mockToken",
      },
    };
    const res = {};
    const next = jest.fn();

    jest
      .spyOn(service, "getAccessToken")
      .mockResolvedValue({ access_token: "mockToken" });

    jwtInjectionMiddleware.use(req, res, next);

    expect(req.headers.authorization).toBe("Bearer mockToken");
    expect(next).toHaveBeenCalled();
  });
});
