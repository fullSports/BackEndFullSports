import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ImagemController } from "./imagem.controller";
import { ImagemService } from "./imagem.service";

@Module({
  imports: [],
  controllers: [ImagemController],
  providers: [ImagemService],
})
export class ImagemModule {}
