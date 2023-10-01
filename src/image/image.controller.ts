import {
  Controller,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
  Post,
  Delete,
  UseGuards,
  Inject,
  CACHE_MANAGER,
  NotAcceptableException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import multerConfig from "./config/multer.config";
import { ImageService } from "./image.service";
import { ImagesList } from "./Schema/image.schema";
import { AuthGuard } from "@nestjs/passport";
import { QueueCacheService } from "src/queues/jobs/queue.cache.service";
import { Cache } from "cache-manager";
import { RequestsEnum } from "src/queues/enum/request.enum";
@ApiTags("Images")
@Controller()
export class ImageController {
  constructor(
    private imageService: ImageService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly queueCacheService: QueueCacheService
  ) {}
  @Get("imagem")
  @UseGuards(AuthGuard("jwt"))
  async ListImages(): Promise<ImagesList[]> {
    const images_cache = await this.cache.get(RequestsEnum.images);
    if (images_cache) {
      return images_cache;
    } else {
      const images = await this.imageService.getImages();
      await this.cache.set(RequestsEnum.images, images);
      return images;
    }
  }
  @Get("imagem/:id")
  async ListImageByID(@Param("id") id: string): Promise<ImagesList> {
    const imageId_cache = await this.cache.get(`${RequestsEnum.images}-${id}`);
    if (imageId_cache) {
      return imageId_cache;
    } else {
      const imageId = await this.imageService.getImageByID(id);
      await this.cache.set(`${RequestsEnum.images}-${id}`);
      return imageId;
    }
  }

  @UseInterceptors(FileInterceptor("file", multerConfig))
  @UseGuards(AuthGuard("jwt"))
  @Post("imagem")
  async uploudImage(@UploadedFile() file) {
    const newImage = await this.imageService.registerImage(file);
    this.queueCacheService.addItem(RequestsEnum.images);
    return {
      messsagem: "imagem cadastrada com sucess",
      image: newImage,
    };
  }

  @Delete("imagem/:id")
  async deleteImage(@Param("id") id: string) {
    const removeImg = await this.imageService.deleteImage(id);
    if (removeImg) {
      this.queueCacheService.addItem(RequestsEnum.images);
      return {
        messagem: "imagem deletada com sucesso",
      };
    } else {
      throw new NotAcceptableException();
    }
  }
}
