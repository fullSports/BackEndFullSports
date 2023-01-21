import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude, Type } from "class-transformer";
import {
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  Length,
  ValidateNested,
} from "class-validator";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { category } from "./category.schema";
export class categoryProduct {
  @ValidateNested()
  @Type(() => category)
  roupa: category | null;
  // @ValidateNested()
  // @Type(() => category)
  // equipamento: category | null;
  // @ValidateNested()
  // @Type(() => category)
  // suplemento: category | null;
  // @ValidateNested()
  // @Type(() => category)
  // calcado: category | null;
}
export type ProductDocument = HydratedDocument<Product>;
@Schema()
export class Product {
  @ValidateNested()
  @Type(() => categoryProduct)
  categoriaProduto: categoryProduct;
  @Prop({ required: true })
  dataCadastro: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
