import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import { jwtConfig } from "../config/jwt.config";
import { AuthService } from "../auth.service";
import { JwtStrategy } from "../strategies/jwt.strategy";
import { UserService } from "@users/user.service";
import { RecommendationService } from "@componentRecommendation/recommendation.service";
import { ProductServices } from "@product/product.service";
import { ProviderModule } from "@providers/providers.module";
import { ProductModule } from "@product/product.module";
import { RecommendationModule } from "@componentRecommendation/recommendation.module";
import { ImageModule } from "@image/image.module";
import { UserModule } from "@users/users.module";
import { AuthController } from "@auth/auth.controller";
import { UnauthorizedException } from "@nestjs/common";
const urlConfig = require("../../../../globalConfig.json");
describe("jwtStrategy", () => {
  let jwtStrategy: JwtStrategy;

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
    jwtStrategy = app.get<JwtStrategy>(JwtStrategy);
  });
  it("should return user when JWT is valid", async () => {
    const payload = { sub: 1 };
    jest
      .spyOn(AuthService.prototype, "validateUserById")
      .mockResolvedValue(true);
    const user = await jwtStrategy.validate(payload);

    expect(user).toEqual(true);
    expect(AuthService.prototype.validateUserById).toHaveBeenCalledWith(1);
  });
  it("should throw UnauthorizedException when JWT is invalid", async () => {
    jest
      .spyOn(AuthService.prototype, "validateUserById")
      .mockResolvedValue(false);
    const payload = { sub: 1 };

    await expect(jwtStrategy.validate(payload)).rejects.toThrow(
      UnauthorizedException
    );
    expect(AuthService.prototype.validateUserById).toHaveBeenCalledWith(1);
  });
});
