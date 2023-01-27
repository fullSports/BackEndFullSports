import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { imagem, ImagemSchema } from "../image/Schema/image.schema";
import { Users, UserSchema } from "./Schema/user.schema";
import { UserService } from "./user.service";
import { UserController } from "./users.controller";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
    MongooseModule.forFeature([{name: imagem.name, schema: ImagemSchema}])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
