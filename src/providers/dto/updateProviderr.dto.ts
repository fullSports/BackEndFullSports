import { Prop } from "@nestjs/mongoose";
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
export class updateProviderDTO {
  @IsOptional()
  @Exclude()
  _id: string;

  @Prop({ required: true })
  @IsNotEmpty({ message: "campo cnpj vazio" })
  @Length(18, 18, { message: "cnpj invalido" })
  cnpj: string;

  @Prop({ required: true })
  @IsNotEmpty({ message: "campo nome da empresa  vazio" })
  nomeEmpresa: string;

  @Prop({ required: true })
  @Length(9, 9, { message: "cep invalido" })
  @IsNotEmpty({ message: "campo cep vazio" })
  cep: string;

  @Prop({ required: true })
  @IsNotEmpty({ message: "campo endereco vazio" })
  endereco: string;
}
