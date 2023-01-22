import { Exclude } from "class-transformer";
import { IsNotEmpty, IsOptional } from "class-validator";
import { categoryDTO } from "./category.dto";

export class updateProductDTO {
  @IsOptional()
  @Exclude()
  _id: string;
  @IsNotEmpty({ message: "campo object(categoriaProduto) vazio" })
  categoriaProduto: string;
}
