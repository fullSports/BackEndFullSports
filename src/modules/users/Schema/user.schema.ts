import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty, Length } from "class-validator";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { Login } from "./login.shema";
import { imagem } from "../../image/Schema/image.schema";
import { ApiProperty } from "@nestjs/swagger";
import { IsCPF } from "../validator/cpf.validator";
import { IsBrithDate } from "../validator/birthDate.validator";
export type UsersDocument = HydratedDocument<Users>;
@Schema()
export class Users {
  @ApiProperty()
  @Prop({ required: true })
  @IsNotEmpty({ message: "campo cpf vazio" })
  @Length(14, 14, { message: "cpf invalido" })
  @IsCPF({ message: "cpf invalido" })
  cpf: string;

  @ApiProperty()
  @Prop({ required: true })
  @IsNotEmpty({ message: "campo nome vazio" })
  @Length(5, 50, { message: "nome precisa ter entr 5 e 50 caracteres" })
  nome: string;

  @ApiProperty()
  @Prop({ required: true })
  @IsNotEmpty({ message: "campo(objeto) login estar vazio vazio" })
  login: Login;

  @ApiProperty()
  @Prop({ required: true })
  @IsNotEmpty({ message: "campo data de nascimento vazio" })
  @IsBrithDate({ message: "data de nascimento invalida" })
  dataNascimento: string;

  @ApiProperty()
  @Prop({ required: true })
  @IsNotEmpty({ message: "campo sexo vazio" })
  sexo: string;

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
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: imagem.name })
  imagemPerfil: ObjectId | null;

  @Prop({ required: true })
  dataCadastro: string;
}
export const UserSchema = SchemaFactory.createForClass(Users);
