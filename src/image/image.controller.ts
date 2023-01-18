import { 
    Body,
     Controller,
     Get,
     Param,
    UploadedFile,
    UseInterceptors,
    Post,
    Delete,
    ParseFilePipeBuilder
} from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from "src/config/multer.config";
import { ImageService } from "./image.service";
import { ImagesList } from "./Schema/image.schema";
@Controller()
export class ImageController{
    constructor(private imageService: ImageService){}
    @Get("imagem")
    async ListImages():Promise<ImagesList[]>{
        return this.imageService.getImages();   
    }
    @Get("imagem/:id")
    async ListImageByID(@Param('id')id:string):Promise<ImagesList>{
      return this.imageService.getImageByID(id)
    }

    @UseInterceptors(FileInterceptor('file',multerConfig))
    @Post('imagem')
    async uploudImage(@UploadedFile() file) {
      const newImage = await this.imageService.registerImage(file);
      return {
        messsagem: "imagem cadastrada com sucess",
        image: newImage
      }
    }
    
    @Delete('imagem/:id')
    async deleteImage(@Param('id')id:string){
       this.imageService.deleteImage(id);
      return {
        messagem: 'imagem deletada com sucesso'
      }

    }
}