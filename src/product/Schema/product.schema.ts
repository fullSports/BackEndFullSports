import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude, Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { imagem } from "src/image/Schema/image.schema";
import { Provider } from "src/providers/Schema/providers.schema";
import { category } from "./category.schema";
export type ProductDocument = HydratedDocument<Product>;
class categoryProduct {
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
  @Prop({ required: true })
  @IsNotEmpty({ message: "campo(objeto) login estar vazio vazio" })
  categoriaProduto: categoryProduct;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Provider.name })
  @IsNotEmpty({ message: "campo fornceder(id) vazio" })
  fornecedor: ObjectId | null;
  @Prop({ required: true })
  @IsNotEmpty({ message: "campo imagem de produo do produto vazio" })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "model",
    index: true,
    default: [],
    required: true,
  })
  imagemProduto: Array<ObjectId>;

  @Prop({ required: true })
  dataCadastro: Date;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
