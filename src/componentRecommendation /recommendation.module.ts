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
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Recommendation.name, schema: RrecommendationSchema },
    ]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: imagem.name, schema: ImagemSchema }]),
    MongooseModule.forFeature([
      { name: Provider.name, schema: ProviderSchema },
    ]),
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
    ScheduleModule.forRoot()
  ],
  controllers: [RecommendationController],
  providers: [RecommendationService, ProductServices],
})
export class RecommendationModule {}
