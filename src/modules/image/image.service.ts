import { Model } from "mongoose";
import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from "@nestjs/common";
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
    if (!imagemPost) throw new NotFoundException();
    else return imagemPost;
  }

  async getImages(): Promise<ImagesList[]> {
    const getImages = await this.imageModel.find().exec();
    if (!getImages) throw new NotFoundException();
    else return getImages;
  }

  async getImageByID(id: string): Promise<ImagesList> {
    const getImageByID = await this.imageModel.findById({ _id: id }).exec();
    if (!getImageByID) throw new NotFoundException();
    else return getImageByID;
  }

  async deleteImage(id: string): Promise<ImagesList> {
    const deleteImage = await this.imageModel.findByIdAndRemove({ _id: id });
    if (!deleteImage) throw new NotFoundException();
    else {
      const deleteImageRemove = await deleteImage.remove();
      if (deleteImageRemove) return deleteImageRemove;
      else throw new NotImplementedException();
    }
  }
}
