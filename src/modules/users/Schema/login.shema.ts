import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
export class Login {
  @ApiProperty()
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

  @ApiProperty()
  @Prop({ required: true })
  @IsNotEmpty({ message: "campo sennha vazio" })
  password: string;

  @ApiProperty()
  @Prop({ required: true })
  @IsNotEmpty({ message: "campo isAdmin vazio" })
  isAdmin: boolean;
}
