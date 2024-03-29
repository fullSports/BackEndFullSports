import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsNotEmpty, IsOptional } from "class-validator";
import { categoryDTO } from "./category.dto";

class categoryProduct {
  @ApiProperty()
  @Prop({ required: true })
  @IsNotEmpty({ message: "campo(objeto) roupa estar vazio vazio" })
  roupa: categoryDTO | undefined | null;

  @Prop({ required: true })
  @IsNotEmpty({ message: "campo(objeto) equipamento estar vazio vazio" })
  equipamento: categoryDTO | undefined | null;

  @Prop({ required: true })
  @IsNotEmpty({ message: "campo(objeto) suplemento estar vazio vazio" })
  suplemento: categoryDTO | undefined | null;

  @Prop({ required: true })
  @IsNotEmpty({ message: "campo(objeto) calcado estar vazio vazio" })
  calcado: categoryDTO | undefined | null;
}
export class updateProductDTO {
  @IsOptional()
  @Exclude()
  _id: string;
  @Prop({ required: true })
  @ApiProperty()
  @IsNotEmpty({ message: "campo(objeto) login estar vazio vazio" })
  categoriaProduto: categoryProduct;
}
