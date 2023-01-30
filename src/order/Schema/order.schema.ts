import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNumber, Min } from "class-validator";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { Product } from "src/product/Schema/product.schema";
import { Users } from "src/users/Schema/user.schema";

export type OrderDocument = HydratedDocument<Order>;
@Schema()
export class Order {
  @Prop({ required: true })
  @IsNumber()
  @Min(1)
  quantidadePedido: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Product.name })
  produto: ObjectId | string | Object; 

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Users.name })
  cliente: ObjectId | string;

  @Prop({ required: true })
  @IsNumber()
  total: number;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
