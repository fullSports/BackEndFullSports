import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductServices } from "./product.service";
import { MongooseModule } from "@nestjs/mongoose";
@Module({
  controllers: [ProductController],
  providers: [ProductServices],
})
export class ProductModule {}
