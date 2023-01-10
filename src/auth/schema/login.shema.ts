import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import mongoose, { HydratedDocument } from "mongoose";
export type UsersDocument = HydratedDocument<Login>;

@Schema()
export class Login {
    @Prop({ required: true })
    @IsNotEmpty({ message: 'campo email vazio' })
    @IsEmail({ ignore_max_length: true }, { message: 'email invalido' })
    email: string

    @Prop({ required: true })
    @IsNotEmpty({ message: 'campo sennha vazio' })
    password: string


    @Prop({ required: true })
    @IsNotEmpty({ message: 'campo isAdmin vazio' })
    isAdmin: boolean
}
export const LoginSchema = SchemaFactory.createForClass(Login);