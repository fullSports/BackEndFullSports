import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './config/jwt.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserService } from 'src/users/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, Users } from 'src/users/Schema/user.schema';
import { RecommendationService } from 'src/componentRecommendation /recommendation.service';
import { ProductServices } from 'src/product/product.service';
import { ImagemSchema, imagem } from 'src/image/Schema/image.schema';
import { Recommendation, RrecommendationSchema } from 'src/componentRecommendation /Schema/Rrecommendation.schema';
import { Product, ProductSchema } from 'src/product/Schema/product.schema';
import { Provider, ProviderSchema } from 'src/providers/Schema/providers.schema';

@Module({
  imports: [
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
})
export class AuthModule { }