import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { imagem, ImagemSchema } from "../image/Schema/image.schema";
import { Users, UserSchema } from "./Schema/user.schema";
import { UserService } from "./user.service";
import { UserController } from "./users.controller";
import {
  Recommendation,
  RrecommendationSchema,
} from "@componentRecommendation/Schema/Rrecommendation.schema";
import { RecommendationService } from "@componentRecommendation/recommendation.service";
import { Product, ProductSchema } from "@product/Schema/product.schema";
import { Provider, ProviderSchema } from "@providers/Schema/providers.schema";
import { ProductServices } from "@product/product.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UserSchema },
      { name: imagem.name, schema: ImagemSchema },
      { name: Recommendation.name, schema: RrecommendationSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Provider.name, schema: ProviderSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, RecommendationService, ProductServices],
})
export class UserModule {}
