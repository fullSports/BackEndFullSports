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
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Users.name, schema: UserSchema },
      { name: Product.name, schema: ProductSchema },
      { name: imagem.name, schema: ImagemSchema },
      { name: Provider.name, schema: ProviderSchema },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, ProductServices],
})
export class OderModule {}
