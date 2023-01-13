import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Login, LoginSchema } from "./Schema/login.shema";
import { Users, UserSchema } from "./Schema/user.schema";
import { UserService } from "./user.service";
import { UserController } from "./users.controller";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Login.name, schema: LoginSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
