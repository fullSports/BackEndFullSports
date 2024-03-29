import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";
import { HydratedDocument } from "mongoose";
import { IsCNPJ } from "../validator/cnpj.validator";

export type ProviderDocument = HydratedDocument<Provider>;
@Schema()
export class Provider {
  @ApiProperty()
  @Prop({ required: true })
  @IsNotEmpty({ message: "campo cnpj vazio" })
  @IsCNPJ({ message: "cnpj invalido" })
  cnpj: string;

  @ApiProperty()
  @Prop({ required: true })
  @IsNotEmpty({ message: "campo nome da empresa  vazio" })
  nomeEmpresa: string;

  @ApiProperty()
  @Prop({ required: true })
  @Length(9, 9, { message: "cep invalido" })
  @IsNotEmpty({ message: "campo cep vazio" })
  cep: string;

  @ApiProperty()
  @Prop({ required: true })
  @IsNotEmpty({ message: "campo endereco vazio" })
  endereco: string;

  @ApiProperty()
  @Prop({ required: false })
  dataCadastro: string;
}
export const ProviderSchema = SchemaFactory.createForClass(Provider);
