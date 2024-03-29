import { Prop } from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
export class UpdatePasswordUser {
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
  email: string | undefined;

  @ApiPropertyOptional()
  @IsEmail({ ignore_max_length: true }, { message: "email invalido" })
  @IsEmail(
    {},
    {
      message: "email precisa ser um endereço de email válido.",
    }
  )
  newEmail: string | undefined;

  @ApiProperty()
  @Prop({ required: true })
  @IsNotEmpty({ message: "campo sennha vazio" })
  OldPassword: string | undefined;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Exclude()
  newPassoWord: string | undefined;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Exclude()
  isAdmin: boolean | undefined;
}
