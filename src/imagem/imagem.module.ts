import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ImagemController } from "./imagem.controller";
import { ImagemService } from "./imagem.service";
import { Imagem, ImagemSchema } from "./Schema/imagem.schema";

@Module({
  imports:[
    MongooseModule.forFeature([{name: Imagem.name,schema: ImagemSchema}])
  ],
  controllers: [ImagemController],
  providers: [ImagemService],
})
export class ImagemModule {}
