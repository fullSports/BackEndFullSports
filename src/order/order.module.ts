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

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: imagem.name, schema: ImagemSchema }]),
    MongooseModule.forFeature([
      { name: Provider.name, schema: ProviderSchema },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, ProductServices],
})
export class OderModule {}
