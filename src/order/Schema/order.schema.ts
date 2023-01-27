import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNumber, Min } from "class-validator";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { Product } from "src/product/Schema/product.schema";
import { Users } from "src/users/Schema/user.schema";

export type OrderDocument = HydratedDocument<Order>;
@Schema()
export class Order{
    @Prop({required:true})
    @IsNumber()
    @Min(1)
    quantidadePedido: Number

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Product.name })
    produto: ObjectId 

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Users.name })
    cliente: ObjectId

    @Prop({required: true})
    @IsNumber()
    total: Number
}
export const OrderSchema =  SchemaFactory.createForClass(Order)