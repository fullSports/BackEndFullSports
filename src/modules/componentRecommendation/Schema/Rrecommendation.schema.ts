import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { Users } from "@users/Schema/user.schema";

export type RecommendationDocumnet = HydratedDocument<Recommendation>;
@Schema()
export class Recommendation {
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Users.name })
  user: ObjectId | string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Prop({ required: false })
  click_calcados: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Prop({ required: false })
  click_suplementos: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Prop({ required: false })
  click_roupas: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Prop({ required: false })
  click_equipamentos: number;
}
export const RrecommendationSchema =
  SchemaFactory.createForClass(Recommendation);
