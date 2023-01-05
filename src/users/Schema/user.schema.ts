import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty, Length } from "class-validator";
import { HydratedDocument } from "mongoose";

export type UsersDocument = HydratedDocument<Users>;
@Schema()
export class Users {
    @Prop({ required: true })
    @IsNotEmpty({ message: 'nome vazio' })
    @Length(5, 50, { message: 'nome precisa ter entr 5 e 50 caracteres' })
    nome: string

    @Prop({ required: true })
    idade: number
};
export const UserSchema = SchemaFactory.createForClass(Users);