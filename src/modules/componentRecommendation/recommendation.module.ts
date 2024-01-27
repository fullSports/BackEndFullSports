import { Module } from "@nestjs/common";
import { RecommendationController } from "./recommendation.controller";
import { RecommendationService } from "./recommendation.service";
import { MongooseModule } from "@nestjs/mongoose";
import {
  Recommendation,
  RecommendationSchema,
} from "./Schema/Rrecommendation.schema";
import { ProductServices } from "@product/product.service";
import { ImageModule } from "@image/image.module";
import { ProviderModule } from "@providers/providers.module";
import { ProductModule } from "@product/product.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Recommendation.name, schema: RecommendationSchema },
    ]),
    ProductModule,
    ImageModule,
    ProviderModule,
  ],
  controllers: [RecommendationController],
  providers: [RecommendationService, ProductServices],
  exports: [MongooseModule],
})
export class RecommendationModule {}
