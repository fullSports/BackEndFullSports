import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import mongoose, { HydratedDocument } from "mongoose";
import { Users } from "src/users/Schema/user.schema";

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

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }] })
    cliente: Users
}
export const LoginSchema = SchemaFactory.createForClass(Login);