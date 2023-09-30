import { CacheModule, Module } from "@nestjs/common";
import ProductController from "./product.controller";
import { ProductServices } from "./product.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./Schema/product.schema";
import { imagem, ImagemSchema } from "../image/Schema/image.schema";
import { Provider, ProviderSchema } from "../providers/Schema/providers.schema";
import { QueueServiceProduct } from "./queues/queuesCache.service";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: imagem.name, schema: ImagemSchema },
      { name: Provider.name, schema: ProviderSchema },
    ]),
    CacheModule.register({
      ttl: 900000,
    }),
  ],
  controllers: [ProductController],
  providers: [ProductServices, QueueServiceProduct],
})
export class ProductModule {}
