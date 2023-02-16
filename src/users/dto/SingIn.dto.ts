import { Prop } from "@nestjs/mongoose";
import { IsEmail, IsNotEmpty } from "class-validator";
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
