import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty, Length } from "class-validator";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
export type ProductDocument = HydratedDocument<ProductSchema>;
@Schema()
export class ProductSchema {
  @Prop({ required: true })
  categoriaProduto: {
    roupa: {} | null;
  };
  @Prop({ required: true })
  dataCadastro: Date;
}
