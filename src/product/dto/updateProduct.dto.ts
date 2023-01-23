import { Prop } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import { IsNotEmpty, IsOptional } from "class-validator";
import { categoryDTO } from "./category.dto";

class categoryProduct {
  @Prop({ required: true })
  @IsNotEmpty({ message: "campo(objeto) roupa estar vazio vazio" })
  roupa: categoryDTO | undefined;

  @Prop({ required: true })
  @IsNotEmpty({ message: "campo(objeto) equipamento estar vazio vazio" })
  equipamento: categoryDTO | undefined;

  @Prop({ required: true })
  @IsNotEmpty({ message: "campo(objeto) suplemento estar vazio vazio" })
  suplemento: categoryDTO | undefined;

  @Prop({ required: true })
  @IsNotEmpty({ message: "campo(objeto) calcado estar vazio vazio" })
  calcado: categoryDTO | undefined;
}
export class updateProductDTO {
  @IsOptional()
  @Exclude()
  _id: string;
  @Prop({ required: true })
  @IsNotEmpty({ message: "campo(objeto) login estar vazio vazio" })
  categoriaProduto: categoryProduct;
}
