import { Module } from "@nestjs/common";
import { RecommendationController } from "./recommendation.controller";
import { RecommendationService } from "./recommendation.service";
import { MongooseModule } from "@nestjs/mongoose";
import {
  Recommendation,
  RrecommendationSchema,
} from "./Schema/Rrecommendation.schema";
import { UserSchema, Users } from "src/users/Schema/user.schema";
import { ProductServices } from "src/product/product.service";
import { Product, ProductSchema } from "src/product/Schema/product.schema";
import { ImagemSchema, imagem } from "src/image/Schema/image.schema";
import {
  Provider,
  ProviderSchema,
} from "src/providers/Schema/providers.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Recommendation.name, schema: RrecommendationSchema },
      { name: Product.name, schema: ProductSchema },
      { name: imagem.name, schema: ImagemSchema },
      { name: Provider.name, schema: ProviderSchema },
      { name: Users.name, schema: UserSchema },
    ]),
  ],
  controllers: [RecommendationController],
  providers: [RecommendationService, ProductServices],
  exports: [RecommendationService],
})
export class RecommendationModule {}
