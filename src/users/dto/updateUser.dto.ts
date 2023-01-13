import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { isEmail, IsEmail, isEmpty, IsNotEmpty, Length } from "class-validator";
import { Login } from "../Schema/login.shema";
export class UpdateUserDTO {
  @Prop({ required: false })
  @Length(14, 14, { message: "Cpf incompleto" })
  cpf: string;

  @Prop({ required: false })
  @Length(5, 50, { message: "nome precisa ter entr 5 e 50 caracteres" })
  nome: string;

  @Prop({ required: false })
  login: Login;

  @Prop({ required: false })
  @Length(10, 10, { message: "data de nascimento invalida" })
  dataNascimento: string;

  @Prop({ required: false })
  sexo: string;

  @Length(9, 9, { message: "cep invalido" })
  cep: string;

  @Prop({ required: false })
  endereco: string;

  @Prop({ required: false })
  dataCadastro: Date;
}
