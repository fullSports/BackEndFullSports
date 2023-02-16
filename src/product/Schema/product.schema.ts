import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { HydratedDocument } from "mongoose";
import { category } from "./category.schema";
export type ProductDocument = HydratedDocument<Product>;
class categoryProduct {
  @ApiProperty()
  @Prop({ required: true })
  @IsNotEmpty({ message: "campo(objeto) roupa estar vazio vazio" })
  roupa: category | undefined;

  @Prop({ required: true })
  @IsNotEmpty({ message: "campo(objeto) equipamento estar vazio vazio" })
  equipamento: category | undefined;

  @Prop({ required: true })
  @IsNotEmpty({ message: "campo(objeto) suplemento estar vazio vazio" })
  suplemento: category | undefined;

  @Prop({ required: true })
  @IsNotEmpty({ message: "campo(objeto) calcado estar vazio vazio" })
  calcado: category | undefined;
}
@Schema()
export class Product {
  @ApiProperty()
  @Prop({ required: true })
  @IsNotEmpty({ message: "campo(objeto) categoriaProduto estar vazio vazio" })
  categoriaProduto: categoryProduct;
  @Prop({ required: true })
  dataCadastro: Date;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
