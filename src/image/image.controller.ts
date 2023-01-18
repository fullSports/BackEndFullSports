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
@Controller()
export class ImageController{
    @UseInterceptors(FileInterceptor('file',multerConfig))
    @Post('imagem')
    uploadFile(
      @UploadedFile() file,
    ) {
      return {
        file: file
      };
    }
      
}