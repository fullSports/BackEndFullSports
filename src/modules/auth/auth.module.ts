import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConfig } from "./config/jwt.config";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UserService } from "@users/user.service";
import { RecommendationService } from "@componentRecommendation/recommendation.service";
import { ProductServices } from "@product/product.service";
import { UserModule } from "@users/users.module";
import { ImageModule } from "@image/image.module";
import { RecommendationModule } from "@componentRecommendation/recommendation.module";
import { ProductModule } from "@product/product.module";
import { ProviderModule } from "@providers/providers.module";

@Module({
  imports: [
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
  exports: [AuthService], // Se AuthService for usado em outros módulos
})
export class AuthModule {}
