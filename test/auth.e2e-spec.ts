import { INestApplication } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "src/auth/auth.controller";
import { AuthService } from "src/auth/auth.service";
import { jwtConfig } from "src/auth/config/jwt.config";
import { JwtStrategy } from "src/auth/strategies/jwt.strategy";
import {
  Recommendation,
  RrecommendationSchema,
} from "src/componentRecommendation /Schema/Rrecommendation.schema";
import { RecommendationService } from "src/componentRecommendation /recommendation.service";
import { ImagemSchema, imagem } from "src/image/Schema/image.schema";
import { Product, ProductSchema } from "src/product/Schema/product.schema";
import { ProductServices } from "src/product/product.service";
import {
  Provider,
  ProviderSchema,
} from "src/providers/Schema/providers.schema";
import { UserSchema, Users } from "src/users/Schema/user.schema";
import { UserService } from "src/users/user.service";
import * as request from "supertest";
const urlConfig = require("./globalConfig.json");
describe("Auth", () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(urlConfig.mongoUri),
        MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
        MongooseModule.forFeature([
          { name: imagem.name, schema: ImagemSchema },
        ]),
        MongooseModule.forFeature([
          { name: Recommendation.name, schema: RrecommendationSchema },
        ]),
        MongooseModule.forFeature([
          { name: Product.name, schema: ProductSchema },
        ]),
        MongooseModule.forFeature([
          { name: Provider.name, schema: ProviderSchema },
        ]),
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
      exports: [AuthService], // Se AuthService for usado em outros módulos
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("• /auth/login-app", async () => {
    const loginApp = await request(app.getHttpServer())
      .post("/auth/login-app")
      .send({
        clientID: String(process.env.clientID),
        clientSecret: String(process.env.clientSecret),
      })
      .expect(201);
    expect(loginApp.body).toHaveProperty("access_token");
  });
});
