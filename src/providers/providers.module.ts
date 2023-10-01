import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProviderController } from "./providers.controller";
import { ProviderService } from "./providers.service";
import { Provider, ProviderSchema } from "./Schema/providers.schema";
import { QueueCacheService } from "src/queues/jobs/queue.cache.service";
import { UserService } from "src/users/user.service";
import { RecommendationService } from "src/componentRecommendation/recommendation.service";
import { ProductServices } from "src/product/product.service";
import { ImageService } from "src/image/image.service";
import { OrderService } from "src/order/order.service";
import { Product, ProductSchema } from "src/product/Schema/product.schema";
import { imagem, ImagemSchema } from "../image/Schema/image.schema";
import { UserSchema, Users } from "src/users/Schema/user.schema";
import {
  Recommendation,
  RrecommendationSchema,
} from "src/componentRecommendation/Schema/Rrecommendation.schema";
import { Order, OrderSchema } from "src/order/Schema/order.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UserSchema },
      { name: imagem.name, schema: ImagemSchema },
      { name: Recommendation.name, schema: RrecommendationSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Provider.name, schema: ProviderSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
  ],
  controllers: [ProviderController],
  providers: [
    UserService,
    RecommendationService,
    ProductServices,
    QueueCacheService,
    ImageService,
    OrderService,
    ProviderService,
  ],
  exports: [ProviderService],
})
export class ProviderModule {}
