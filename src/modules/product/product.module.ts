import { Module } from "@nestjs/common";
import ProductController from "./product.controller";
import { ProductServices } from "./product.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./Schema/product.schema";
import { ImageModule } from "@image/image.module";
import { ProviderModule } from "@providers/providers.module";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    ImageModule,
    ProviderModule,
  ],
  controllers: [ProductController],
  providers: [ProductServices],
  exports: [MongooseModule],
})
export class ProductModule {}
