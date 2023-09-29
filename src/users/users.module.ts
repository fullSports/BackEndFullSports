import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { imagem, ImagemSchema } from "../image/Schema/image.schema";
import { Users, UserSchema } from "./Schema/user.schema";
import { UserService } from "./user.service";
import { UserController } from "./users.controller";
import {
  Recommendation,
  RrecommendationSchema,
} from "src/componentRecommendation /Schema/Rrecommendation.schema";
import { RecommendationService } from "src/componentRecommendation /recommendation.service";
import { Product, ProductSchema } from "src/product/Schema/product.schema";
import {
  Provider,
  ProviderSchema,
} from "src/providers/Schema/providers.schema";
import { ProductServices } from "src/product/product.service";

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
