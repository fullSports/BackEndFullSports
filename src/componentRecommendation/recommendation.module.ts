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
import { QueueCacheService } from "src/queues/jobs/queue.cache.service";
import { ImageService } from "src/image/image.service";
import { OrderService } from "src/order/order.service";
import { ProviderService } from "src/providers/providers.service";
import { UserService } from "src/users/user.service";
import { Order, OrderSchema } from "src/order/Schema/order.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: imagem.name, schema: ImagemSchema },
      { name: Provider.name, schema: ProviderSchema },
      { name: Recommendation.name, schema: RrecommendationSchema },
      { name: Order.name, schema: OrderSchema },
      { name: Users.name, schema: UserSchema },
    ]),
  ],
  controllers: [RecommendationController],
  providers: [
    ProductServices,
    QueueCacheService,
    RecommendationService,
    ImageService,
    OrderService,
    ProviderService,
    UserService,
  ],
  exports: [RecommendationService],
})
export class RecommendationModule {}
