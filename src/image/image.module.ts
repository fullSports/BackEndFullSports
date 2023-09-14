import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ImageController } from "./image.controller";
import { ImageService } from "./image.service";
import { ImagemSchema, imagem } from "./Schema/image.schema";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: imagem.name, schema: ImagemSchema }]),
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
