import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
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
  @IsString()
  @IsOptional()
  @Exclude()
  cpf: string;

  @IsOptional()
  @IsString()
  @Exclude()
  nome: string;

  @IsOptional()
  @Exclude()
  login: Login;

  @IsOptional()
  @IsString()
  @Exclude()
  dataNascimento: string;

  @IsOptional()
  @IsString()
  @Exclude()
  sexo: string;

  @IsOptional()
  @IsString()
  @Exclude()
  cep: string;

  @IsOptional()
  @IsString()
  @Exclude()
  endereco: string;

  @IsOptional()
  @Exclude()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "model" })
  imagemPerfil: ObjectId | null;
}
