import { Controller,Post,Body,UseInterceptors } from "@nestjs/common";
import { ImagemService } from "./imagem.service";
const multerConfig = require("src/config/multer.config");
const multer = require('multer');
@Controller()
export class ImagemController {
    constructor(private imagemService: ImagemService){}

    @Post("imagem")
    @multer(multerConfig).sigle('files')
    async RegisterImage(@Body()registerImage: any){
        const newImagem = await this.imagemService.registerImage(registerImage) 
        return {
            imagem: newImagem,
            messagem: 'imagem cadastrada com sucesso'
        }
    }
}
