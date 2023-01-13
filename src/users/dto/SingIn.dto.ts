import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { isEmail, IsEmail, IsNotEmpty, Length } from "class-validator";
export class RealizarLogin {
  @Prop({ required: true })
  @IsNotEmpty({ message: "campo email vazio" })
  @IsEmail({ ignore_max_length: true }, { message: "email invalido" })
  @IsEmail(
    {},
    {
      message: "email precisa ser um endereço de email válido.",
    }
  )
  email: string;

  @Prop({ required: true })
  @IsNotEmpty({ message: "campo sennha vazio" })
  password: string;
}
