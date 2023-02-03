import { Module } from "@nestjs/common";
import ProductController from "./product.controller";
import { ProductServices } from "./product.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./Schema/product.schema";
import { imagem, ImagemSchema } from "../image/Schema/image.schema";
import { Provider, ProviderSchema } from "../providers/Schema/providers.schema";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: imagem.name, schema: ImagemSchema }]),
    MongooseModule.forFeature([
      { name: Provider.name, schema: ProviderSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductServices],
})
export class ProductModule {}
