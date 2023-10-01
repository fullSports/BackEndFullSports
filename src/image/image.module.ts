import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ImageController } from "./image.controller";
import { ImageService } from "./image.service";
import { ImagemSchema, imagem } from "./Schema/image.schema";
import { ProductServices } from "src/product/product.service";
import { QueueCacheService } from "src/queues/jobs/queue.cache.service";
import { RecommendationService } from "src/componentRecommendation/recommendation.service";
import { OrderService } from "src/order/order.service";
import { ProviderService } from "src/providers/providers.service";
import { UserService } from "src/users/user.service";
import { Product, ProductSchema } from "src/product/Schema/product.schema";
import {
  Provider,
  ProviderSchema,
} from "src/providers/Schema/providers.schema";
import {
  Recommendation,
  RrecommendationSchema,
} from "src/componentRecommendation/Schema/Rrecommendation.schema";
import { Order, OrderSchema } from "src/order/Schema/order.schema";
import { UserSchema, Users } from "src/users/Schema/user.schema";
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
  controllers: [ImageController],
  providers: [
    ProductServices,
    QueueCacheService,
    RecommendationService,
    ImageService,
    OrderService,
    ProviderService,
    UserService,
  ],
  exports: [ImageService],
})
export class ImageModule {}
