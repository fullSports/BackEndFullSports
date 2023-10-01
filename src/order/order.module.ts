import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { imagem, ImagemSchema } from "../image/Schema/image.schema";
import { ProductServices } from "../product/product.service";
import { Provider, ProviderSchema } from "../providers/Schema/providers.schema";
import { Product, ProductSchema } from "../product/Schema/product.schema";
import { Users, UserSchema } from "../users/Schema/user.schema";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { Order, OrderSchema } from "./Schema/order.schema";
import {
  Recommendation,
  RrecommendationSchema,
} from "src/componentRecommendation/Schema/Rrecommendation.schema";
import { QueueCacheService } from "src/queues/jobs/queue.cache.service";
import { RecommendationService } from "src/componentRecommendation/recommendation.service";
import { ImageService } from "src/image/image.service";
import { ProviderService } from "src/providers/providers.service";
import { UserService } from "src/users/user.service";

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
  controllers: [OrderController],
  providers: [
    ProductServices,
    QueueCacheService,
    RecommendationService,
    ImageService,
    OrderService,
    ProviderService,
    UserService,
  ],
  exports: [OrderService],
})
export class OderModule {}
