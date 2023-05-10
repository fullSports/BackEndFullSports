import { ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { IsCNPJ } from "../validator/cnpj.validator";
export class updateProviderDTO {
  @IsOptional()
  @Exclude()
  _id: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Exclude()
  @IsNotEmpty({ message: "campo cnpj vazio" })
  @IsCNPJ({ message: "cnpj invalido" })
  cnpj: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Exclude()
  @IsNotEmpty({ message: "campo nome da empresa  vazio" })
  nomeEmpresa: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Exclude()
  @Length(9, 9, { message: "cep invalido" })
  @IsNotEmpty({ message: "campo cep vazio" })
  cep: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Exclude()
  @IsNotEmpty({ message: "campo endereco vazio" })
  endereco: string;
}
