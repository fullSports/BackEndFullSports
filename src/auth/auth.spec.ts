import { JwtModule } from "@nestjs/jwt"
import { MongooseModule } from "@nestjs/mongoose"
import { PassportModule } from "@nestjs/passport"
import { Test, TestingModule } from "@nestjs/testing"
import { Recommendation, RrecommendationSchema } from "src/componentRecommendation /Schema/Rrecommendation.schema"
import { ImagemSchema, imagem } from "src/image/Schema/image.schema"
import { Product, ProductSchema } from "src/product/Schema/product.schema"
import { Provider, ProviderSchema } from "src/providers/Schema/providers.schema"
import { UserSchema, Users } from "src/users/Schema/user.schema"
import { jwtConfig } from "./config/jwt.config"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { JwtStrategy } from "./strategies/jwt.strategy"
import { UserService } from "src/users/user.service"
import { RecommendationService } from "src/componentRecommendation /recommendation.service"
import { ProductServices } from "src/product/product.service"
const urlConfig = require("../globalConfig.json");
describe("AuthController", () => {
    let authController: AuthController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot(urlConfig.mongoUri),
                MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
                MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
                MongooseModule.forFeature([{ name: imagem.name, schema: ImagemSchema }]),
                MongooseModule.forFeature([
                    { name: Recommendation.name, schema: RrecommendationSchema },
                ]),
                MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
                MongooseModule.forFeature([
                    { name: Provider.name, schema: ProviderSchema },
                ]),
                PassportModule,
                JwtModule.register(jwtConfig),
                // Outros módulos necessários para o AuthModule
            ],
            controllers: [AuthController],
            providers: [AuthService, JwtStrategy, UserService, RecommendationService, ProductServices],
            exports: [AuthService], // Se AuthService for usado em outros módulos
        }).compile();
        authController = app.get<AuthController>(AuthController);
    });

    describe("👨‍💻 MethodsAuth", () => {
        it("👨‍💻loginUser() ", async () => {
            const loginApp = await authController.LoginApp({
                clientID: String(process.env.clientID),
                clientSecret: String(process.env.clientSecret)
            });
            expect(loginApp.access_token)
        })

    })
})