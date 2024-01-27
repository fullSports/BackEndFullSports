import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductServices } from "../product/product.service";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { Order, OrderSchema } from "./Schema/order.schema";
import { UserModule } from "@users/users.module";
import { ProductModule } from "@product/product.module";
import { ImageModule } from "@image/image.module";
import { ProviderModule } from "@providers/providers.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    UserModule,
    ProductModule,
    ImageModule,
    ProviderModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, ProductServices],
})
export class OderModule {}
