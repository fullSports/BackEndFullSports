import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty, Length } from "class-validator";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { Login } from "src/auth/schema/login.shema";

export type UsersDocument = HydratedDocument<Users>;
@Schema()
export class Users {
  @Prop({ required: true })
  @IsNotEmpty({ message: "campo cpf vazio" })
  @Length(14, 14, { message: "Cpf incompleto" })
  cpf: string;

  @Prop({ required: true })
  @IsNotEmpty({ message: "campo nome vazio" })
  @Length(5, 50, { message: "nome precisa ter entr 5 e 50 caracteres" })
  nome: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Login" }] })
  login: Login;

  @Prop({ required: true })
  @IsNotEmpty({ message: "campo data de nascimento vazio" })
  @Length(10, 10, { message: "data de nascimento invalida" })
  dataNascimento: string;

  @Prop({ required: true })
  @IsNotEmpty({ message: "campo sexo vazio" })
  sexo: string;

  @Prop({ required: true })
  @Length(9, 9, { message: "cep invalido" })
  @IsNotEmpty({ message: "campo cep vazio" })
  cep: string;

  @Prop({ required: true })
  @IsNotEmpty({ message: "campo endereco vazio" })
  endereco: string;

  @Prop({ required: true })
  @IsNotEmpty({ message: "campo data vazio" })
  dataCadastro: Date;

  // imagemPerfil
}
export const UserSchema = SchemaFactory.createForClass(Users);
