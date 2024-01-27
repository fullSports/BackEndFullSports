import { INestApplication } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "@auth/auth.controller";
import { AuthService } from "@auth/auth.service";
import { jwtConfig } from "@auth/config/jwt.config";
import { JwtStrategy } from "@auth/strategies/jwt.strategy";
import { RecommendationService } from "@componentRecommendation/recommendation.service";
import { ProductServices } from "@product/product.service";
import { UserService } from "@users/user.service";
import * as request from "supertest";
import { UserModule } from "@users/users.module";
import { ImageModule } from "@image/image.module";
import { RecommendationModule } from "@componentRecommendation/recommendation.module";
import { ProductModule } from "@product/product.module";
import { ProviderModule } from "@providers/providers.module";
const urlConfig = require("./globalConfig.json");
describe("Auth", () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(urlConfig.mongoUri),
        UserModule,
        ImageModule,
        RecommendationModule,
        ProductModule,
        ProviderModule,
        PassportModule,
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
      exports: [AuthService], // Se AuthService for usado em outros módulos
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("• /auth/login-app", async () => {
    const loginApp = await request(app.getHttpServer())
      .post("/auth/login-app")
      .send({
        clientId: String(process.env.clientId),
        clientSecret: String(process.env.clientSecret),
      })
      .expect(201);
    expect(loginApp.body).toHaveProperty("access_token");
  });
});
