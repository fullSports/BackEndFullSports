import { Injectable } from "@nestjs/common";
import { imagem } from "./Schema/imagem.schema";

@Injectable()
export class ImagemService {
    constructor(
        @Injectable(imagem.name) private readonly imagemMode : Model<Imagem
    ){}
}
