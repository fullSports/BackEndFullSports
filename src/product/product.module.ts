import { Module } from "@nestjs/common";
import ProductController from "./product.controller";
import { ProductServices } from "./product.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./Schema/product.schema";
import { imagem, ImagemSchema } from "../image/Schema/image.schema";
import { Provider, ProviderSchema } from "../providers/Schema/providers.schema";
import { QueueCacheService } from "src/queue/jobs/queue.cache.service";
import { RecommendationService } from "src/componentRecommendation/recommendation.service";
import { ImageService } from "src/image/image.service";
import { OrderService } from "src/order/order.service";
import { ProviderService } from "src/providers/providers.service";
import { UserService } from "src/users/user.service";
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
  controllers: [ProductController],
  providers: [
    ProductServices,
    QueueCacheService,
    RecommendationService,
    ImageService,
    OrderService,
    ProviderService,
    UserService,
  ],
  exports: [ProductServices],
})
export class ProductModule {}
