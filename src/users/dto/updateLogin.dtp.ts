import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import {
  isEmail,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from "class-validator";
export class UpdatePasswordUser {
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

  @IsEmail({ ignore_max_length: true }, { message: "email invalido" })
  @IsEmail(
    {},
    {
      message: "email precisa ser um endereço de email válido.",
    }
  )
  newEmail: string;

  @Prop({ required: true })
  @IsNotEmpty({ message: "campo sennha vazio" })
  OldPassword: string;

  @IsOptional()
  @IsString()
  @Exclude()
  newPassoWord: string;

  @IsOptional()
  @IsString()
  @Exclude()
  isAdmin: boolean;
}
