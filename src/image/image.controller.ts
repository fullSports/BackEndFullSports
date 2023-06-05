import {
  Controller,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
  Post,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import multerConfig from "./config/multer.config";
import { ImageService } from "./image.service";
import { ImagesList } from "./Schema/image.schema";
import { AuthGuard } from "@nestjs/passport";
@ApiTags("Images")
@Controller()
export class ImageController {
  constructor(private imageService: ImageService) { }
  @Get("imagem")
  @UseGuards(AuthGuard())
  async ListImages(): Promise<ImagesList[]> {
    return this.imageService.getImages();
  }
  @Get("imagem/:id")
  async ListImageByID(@Param("id") id: string): Promise<ImagesList> {
    return this.imageService.getImageByID(id);
  }

  @UseInterceptors(FileInterceptor("file", multerConfig))
  @Post("imagem")
  async uploudImage(@UploadedFile() file) {
    const newImage = await this.imageService.registerImage(file);
    return {
      messsagem: "imagem cadastrada com sucess",
      image: newImage,
    };
  }

  @Delete("imagem/:id")
  async deleteImage(@Param("id") id: string) {
    const removeImg = await this.imageService.deleteImage(id);
    if (removeImg) {
      return {
        messagem: "imagem deletada com sucesso",
      };
    }
  }
}
