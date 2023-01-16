import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { isEmail, IsEmail, isEmpty, IsNotEmpty, Length } from "class-validator";
export class UpdateUserDTO {
  @Prop()
  // @Length(14, 14, { message: "Cpf incompleto" })
  cpf: string;

  @Prop()
  // @Length(5, 50, { message: "nome precisa ter entr 5 e 50 caracteres" })
  nome: string;

  // @Prop()
  // login: Login;

  @Prop()
  // @Length(10, 10, { message: "data de nascimento invalida" })
  dataNascimento: string;

  @Prop()
  sexo: string;

  // @Length(9, 9, { message: "cep invalido" })
  cep: string;

  @Prop()
  endereco: string;

  @Prop()
  dataCadastro: Date;
}
