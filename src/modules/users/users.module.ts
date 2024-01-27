import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Users, UserSchema } from "./Schema/user.schema";
import { UserService } from "./user.service";
import { UserController } from "./users.controller";
import { RecommendationService } from "@componentRecommendation/recommendation.service";
import { ProductServices } from "@product/product.service";
import { ImageModule } from "@image/image.module";
import { ProviderModule } from "@providers/providers.module";
import { ProductModule } from "@product/product.module";
import { RecommendationModule } from "@componentRecommendation/recommendation.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
    RecommendationModule,
    ProductModule,
    ProviderModule,
    ImageModule,
  ],
  controllers: [UserController],
  providers: [UserService, RecommendationService, ProductServices],
  exports: [MongooseModule],
})
export class UserModule {}
