import { Module } from "@nestjs/common";
import ProductController from "./product.controller";
import { ProductServices } from "./product.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./Schema/product.schema";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductServices],
})
export class ProductModule {}
