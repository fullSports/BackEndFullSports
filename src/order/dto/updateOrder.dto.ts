import { Prop } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";
import mongoose, { ObjectId } from "mongoose";
import { Product } from "src/product/Schema/product.schema";
import { Users } from "src/users/Schema/user.schema";

export class UpdateOrderDTO {
  @IsOptional()
  @Exclude()
  @IsNumber()
  @Min(1)
  quantidadePedido: number;

  @IsOptional()
  @Exclude()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Product.name })
  produto: ObjectId | undefined;

  @IsOptional()
  @Exclude()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Users.name })
  cliente: ObjectId | undefined;

  @IsOptional()
  @Exclude()
  @IsNumber()
  total: number;
}
