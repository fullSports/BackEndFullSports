import { CACHE_MANAGER, Inject, Injectable, Logger } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { RequestsEnum } from "../enum/request.enum";
import { RecommendationService } from "src/componentRecommendation/recommendation.service";
import { ImageService } from "src/image/image.service";
import { OrderService } from "src/order/order.service";
import { ProductServices } from "src/product/product.service";
import { ProviderService } from "src/providers/providers.service";
import { UserService } from "src/users/user.service";
import { Cache } from "cache-manager";
@Injectable()
export class QueueCacheService {
  private queue: string[] = [];
  private emitter: EventEmitter2 = new EventEmitter2();
  constructor(
    private readonly recommendationService: RecommendationService,
    private readonly imageService: ImageService,
    private readonly orderService: OrderService,
    private readonly productService: ProductServices,
    private readonly providerService: ProviderService,
    private readonly usersService: UserService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache
  ) {
    this.emitter.on("update-queue", () => {
      this.processQueue();
    });
  }
  addItem(item: string) {
    this.queue.push(item);
    this.emitter.emit("update-queue");
  }

  getQueue(): string[] {
    return this.queue;
  }
  private async processQueue() {
    while (this.queue.length > 0) {
      const item = this.queue.shift();
      Logger.debug(`Processando item: ${item} `);
      const split = item.split("-");
      const request =
        split.length == 3
          ? await this.requestsById(`${split[0]}-${split[1]}`, split[2])
          : await this.requestsAll(item);
      Logger.debug(request);
      const cache = await this.cache.get(item);
      Logger.debug(cache);
      if (cache) {
        await this.cache.del(item);
        await this.cache.set(item, request);
      } else {
        await this.cache.set(item, request);
      }
      Logger.debug(`item - ${item} - processado `);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  private async requestsAll(item: string) {
    if (item == RequestsEnum.componentRecommendation) {
      return await this.recommendationService.listRecommedations();
    }
    if (item == RequestsEnum.images) {
      return await this.imageService.getImages();
    }
    if (item == RequestsEnum.order) {
      return await this.orderService.ListOrders();
    }
    if (item == RequestsEnum.product) {
      return await this.productService.listProducts();
    }
    if (item == RequestsEnum.providers) {
      return await this.providerService.ListProviders();
    }
    if (item == RequestsEnum.users) {
      return await this.usersService.ListUsers();
    }
  }
  private async requestsById(item: string, id: string) {
    if (item == RequestsEnum.componentRecommendation) {
      return await this.recommendationService.ListRecommedationById(id);
    }
    if (item == RequestsEnum.images) {
      return await this.imageService.getImageByID(id);
    }
    if (item == RequestsEnum.order) {
      return await this.orderService.searchIdOrder(id);
    }
    if (item == RequestsEnum.product) {
      return await this.productService.searchProductId(id);
    }
    if (item == RequestsEnum.providers) {
      return await this.providerService.searchIdProvider(id);
    }
    if (item == RequestsEnum.users) {
      return await this.usersService.searchId(id);
    }
  }
}
