import { Module } from "@nestjs/common";
import { QueueCacheService } from "./jobs/queue.cache.service";
import { ProviderModule } from "src/providers/providers.module";
import { UserModule } from "src/users/users.module";
import { RecommendationModule } from "src/componentRecommendation/recommendation.module";
import { ImageModule } from "src/image/image.module";
import { OderModule } from "src/order/order.module";
import { ProductModule } from "src/product/product.module";

@Module({
  imports: [
    ProviderModule,
    UserModule,
    RecommendationModule,
    ImageModule,
    OderModule,
    ProductModule,
  ],
  providers: [QueueCacheService],
  exports: [QueueCacheService],
})
export class QueueModule {}
