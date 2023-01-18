import { Injectable,Post } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Imagem, ImagemDocument } from "./Schema/imagem.schema";

@Injectable()
export class ImagemService {
    constructor(
        @InjectModel(Imagem.name) private readonly imagemModel:Model<ImagemDocument>
    ){}
    @Post("imagem")
    async registerImage(registerImage: any):Promise<Imagem>{
        const { originalname: name, size, key, location: url = "" } = registerImage
        const imagemPost = await this.imagemModel.create({
            name,
            size,
            key,
            url
        })
        return imagemPost
    }
}
