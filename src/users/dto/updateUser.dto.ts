import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { isEmail, IsEmail, isEmpty, IsNotEmpty, Length } from "class-validator";
import mongoose, { ObjectId } from "mongoose";
export class UpdateUserDTO {
  // @Length(14, 14, { message: "Cpf incompleto" })
  cpf: string;

  // @Length(5, 50, { message: "nome precisa ter entr 5 e 50 caracteres" })
  nome: string;

  //
  // login: Login;

  // @Length(10, 10, { message: "data de nascimento invalida" })
  dataNascimento: string;

  sexo: string;

  // @Length(9, 9, { message: "cep invalido" })
  cep: string;

  endereco: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "model" })
  imagemPerfil: ObjectId;
}
