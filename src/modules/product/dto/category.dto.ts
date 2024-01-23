import { Prop } from "@nestjs/mongoose";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import mongoose, { ObjectId } from "mongoose";

export class categoryDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @Exclude()
  @IsNotEmpty({ message: "campo nome do produto vazio" })
  nome: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Exclude()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "provider" })
  fornecedor: ObjectId | string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @Exclude()
  @IsNotEmpty({ message: "campo cor do produto vazio" })
  cor: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Exclude()
  @IsNotEmpty({ message: "campo sexo alvo do produto vazio" })
  sexo: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Exclude()
  @IsNumber()
  @IsNotEmpty({ message: "campo tamanho do produto vazio" })
  tamanho: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Exclude()
  @IsNotEmpty({ message: "campo preço do produto vazio" })
  preco: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Exclude()
  @IsNumber()
  @IsNotEmpty({ message: "campo quantidade do produto vazio" })
  quantidade: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Exclude()
  @IsNotEmpty({ message: "campo imagem de produo do produto vazio" })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "model",
    index: true,
    default: [],
  })
  imagemProduto: Array<ObjectId> | Array<string> | null;
}
