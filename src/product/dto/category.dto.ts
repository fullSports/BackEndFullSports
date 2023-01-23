import { Prop } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";
import mongoose, { ObjectId } from "mongoose";

export class categoryDTO {
  @IsOptional()
  @Exclude()
  @IsNotEmpty({ message: "campo nome do produto vazio" })
  nome: string;
  @IsOptional()
  @Exclude()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "provider" })
  fornecedor: ObjectId | null;

  @IsOptional()
  @Exclude()
  @IsNotEmpty({ message: "campo cor do produto vazio" })
  cor: string;

  @IsOptional()
  @Exclude()
  @IsNotEmpty({ message: "campo sexo alvo do produto vazio" })
  sexo: string;

  @IsOptional()
  @Exclude()
  @IsNumber()
  @IsNotEmpty({ message: "campo tamanho do produto vazio" })
  tamanho: number;

  @IsOptional()
  @Exclude()
  @IsNotEmpty({ message: "campo preço do produto vazio" })
  preco: string;

  @IsOptional()
  @Exclude()
  @IsNumber()
  @IsNotEmpty({ message: "campo quantidade do produto vazio" })
  quantidade: number;

  @IsOptional()
  @Exclude()
  @IsNotEmpty({ message: "campo imagem de produo do produto vazio" })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "model",
    index: true,
    default: [],
  })
  imagemProduto: Array<ObjectId> | null;
}
