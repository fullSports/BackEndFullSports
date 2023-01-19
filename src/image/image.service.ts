import { Model } from "mongoose";
import { Body, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ImageDocument, imagem, ImagesList } from "./Schema/image.schema";

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(imagem.name) private readonly imageModel: Model<ImageDocument>
  ) {}
  async registerImage(file) {
    const { originalname: name, size, key, location: url = "" } = file;

    const imagemPost = await this.imageModel.create({
      name: name,
      size: size,
      key: key,
      url: url,
    });
    return imagemPost;
  }

  async getImages(): Promise<ImagesList[]> {
    return this.imageModel.find().exec();
  }

  async getImageByID(id: string): Promise<ImagesList> {
    return this.imageModel.findById({ _id: id }).exec();
  }

  async deleteImage(id: string): Promise<ImagesList> {
    const deleteImage = await this.imageModel.findById({ _id: id });
    await deleteImage.remove();
    return deleteImage;
  }
}
