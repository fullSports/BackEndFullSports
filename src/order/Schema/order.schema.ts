import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
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
  @ApiProperty()
  quantidadePedido: number;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Product.name })
  produto: ObjectId | string;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Users.name })
  cliente: ObjectId | string;

  @ApiProperty()
  @Prop({ required: false })
  total: number;

  @Prop({ required: true })
  dataCadastro: string;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
