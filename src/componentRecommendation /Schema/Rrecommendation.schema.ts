import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNumber, IsOptional } from "class-validator";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { Users } from "src/users/Schema/user.schema";

export type RecommendationDocumnet = HydratedDocument<Recommendation>;
@Schema()
export class Recommendation {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Users.name })
    user: ObjectId | string;

    @IsNumber()
    @IsOptional()
    click_calcados: number;

    @IsNumber()
    @IsOptional()
    click_suplementos: number;

    @IsNumber()
    @IsOptional()
    click_roupas: number;

    @IsNumber()
    @IsOptional()
    click_equipamentos: number;
}
export const RrecommendationSchema = SchemaFactory.createForClass(Recommendation);