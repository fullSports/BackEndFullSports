import { Prop } from "@nestjs/mongoose";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
import mongoose, { ObjectId } from "mongoose";
import { Login } from "../Schema/login.shema";
import { IsCPF } from "../validator/cpf.validator";
import { IsBrithDate } from "../validator/birthDate.validator";
export class UpdateUserDTO {
  @IsOptional()
  @Exclude()
  _id: string;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Exclude()
  @IsCPF({ message: "cpf invalido" })
  cpf: string | null;

  @ApiPropertyOptional() 
  @IsOptional()
  @IsString()
  @Exclude()
  nome: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @Exclude()
  login: Login | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Exclude()
  @IsBrithDate({ message: "data de nascimento invalida" })
  dataNascimento: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Exclude()
  sexo: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Exclude()
  cep: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Exclude()
  endereco: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @Exclude()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "model" })
  imagemPerfil: ObjectId | null;
}
