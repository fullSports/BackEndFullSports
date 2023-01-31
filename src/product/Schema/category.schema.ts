import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Min } from "class-validator";
import mongoose, { ObjectId } from "mongoose";
import { imagem } from "../../image/Schema/image.schema";
import { Provider } from "../../providers/Schema/providers.schema";

export class category {
  @ApiProperty()
  @Prop({ required: true })
  @IsNotEmpty({ message: "campo nome do produto vazio" })
  nome: string;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Provider.name })
  @IsNotEmpty({ message: "campo fornceder(id) vazio" })
  fornecedor: ObjectId | null;

  @ApiProperty()
  @Prop({ required: true })
  @IsNotEmpty({ message: "campo cor do produto vazio" })
  cor: string;

  @ApiProperty()
  @IsNotEmpty({ message: "campo sexo alvo do produto vazio" })
  sexo: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: "campo tamanho do produto vazio" })
  tamanho: number;

  @ApiProperty()
  @IsNotEmpty({ message: "campo preço do produto vazio" })
  preco: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: "campo tamanho do produto vazio" })
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
  imagemProduto: Array<ObjectId> | null;
}
