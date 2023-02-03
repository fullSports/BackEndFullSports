import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import {
  isEmail,
  IsEmail,
  isEmpty,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from "class-validator";
import mongoose, { ObjectId } from "mongoose";
import { Login } from "../Schema/login.shema";
export class UpdateUserDTO {
  @IsOptional()
  @Exclude()
  _id: string;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Exclude()
  cpf: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Exclude()
  nome: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Exclude()
  login: Login;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Exclude()
  dataNascimento: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Exclude()
  sexo: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Exclude()
  cep: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Exclude()
  endereco: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Exclude()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "model" })
  imagemPerfil: ObjectId | null;
}
