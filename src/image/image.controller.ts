import { 
    Body,
     Controller,
     Get,
     Param,
    UploadedFile,
    UseInterceptors,
    Post,
    ParseFilePipeBuilder
} from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from "src/config/multer.config";
import { ImageService } from "./image.service";
@Controller()
export class ImageController{
    constructor(private imageService: ImageService){}
    @UseInterceptors(FileInterceptor('file',multerConfig))
    @Post('imagem')
    async uploudImage(@UploadedFile() file) {
      const newImage = await this.imageService.registerImage(file);
      return {
        messsagem: "imagem cadastrada com sucess",
        image: newImage
      }
    }
      
}