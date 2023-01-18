import { Model } from "mongoose";
import { Body, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ImageDocument,imagem } from "./Schema/image.schema";

@Injectable()
export class ImageService{
    constructor(@InjectModel(imagem.name) private readonly imageModel: Model<ImageDocument>){}
    async registerImage(file){
        const { originalname: name, size, key, location: url = "" } = file;

        const imagemPost = await this.imageModel.create({
            name:name,
            size:size,
            key:key,    
            url:url,
        })
        return imagemPost
    }
}