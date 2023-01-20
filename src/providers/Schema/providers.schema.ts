import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty, Length } from "class-validator";
import { HydratedDocument } from "mongoose";

export type ProviderDocument = HydratedDocument<Provider>;
@Schema()
export class Provider {
  @Prop({ required: true })
  @IsNotEmpty({ message: "campo cnpj vazio" })
  @Length(18, 18, { message: "cnpj invalido" })
  cnpj: string;

  @Prop({ required: true })
  @IsNotEmpty({ message: "campo nome da empresa  vazio" })
  nomeEmpresa: string;

  @Prop({ required: true })
  @Length(9, 9, { message: "cep invalido" })
  @IsNotEmpty({ message: "campo cep vazio" })
  cep: string;

  @Prop({ required: true })
  @IsNotEmpty({ message: "campo endereco vazio" })
  endereco: string;

  @Prop({ required: true })
  dataCadastro: Date;
}
export const ProviderSchema = SchemaFactory.createForClass(Provider);
