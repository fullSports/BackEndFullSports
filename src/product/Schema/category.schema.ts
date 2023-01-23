import { Prop } from "@nestjs/mongoose";
import { IsNotEmpty, IsNumber, Min } from "class-validator";
import mongoose, { ObjectId } from "mongoose";
import { imagem } from "../../image/Schema/image.schema";
import { Provider } from "../../providers/Schema/providers.schema";

export class category {
  @Prop({ required: true })
  @IsNotEmpty({ message: "campo nome do produto vazio" })
  nome: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Provider.name })
  @IsNotEmpty({ message: "campo fornceder(id) vazio" })
  fornecedor: ObjectId | null;

  @Prop({ required: true })
  @IsNotEmpty({ message: "campo cor do produto vazio" })
  cor: string;

  @IsNotEmpty({ message: "campo sexo alvo do produto vazio" })
  sexo: string;

  @IsNumber()
  @IsNotEmpty({ message: "campo tamanho do produto vazio" })
  tamanho: number;

  @IsNotEmpty({ message: "campo preço do produto vazio" })
  preco: string;

  @Min(1, { message: "minimo de 1 de quantidade de estoque" })
  quantidade: number;

  @Prop({ required: true })
  @IsNotEmpty({ message: "campo imagem de produo do produto vazio" })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: imagem.name,
    index: true,
    default: [],
    required: true,
  })
  imagemProduto: Array<ObjectId>;
}
