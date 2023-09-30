// queue.service.ts

import { Inject, Injectable, Logger } from "@nestjs/common";
import * as CacheService from "@nestjs/common/cache";
import { Cache } from "cache-manager";
import { ProductServices } from "../product.service";
@Injectable()
export class QueueServiceProduct {
  constructor(
    @Inject(CacheService.CACHE_MANAGER) private readonly cache: Cache,
    private readonly productService: ProductServices
  ) {}
  private queue: string[] = [];
  private isProcessing = false;

  addToQueue(data: string) {
    this.queue.push(data);
    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  private async processQueue() {
    if (this.queue.length === 0) {
      this.isProcessing = false;
      return;
    }

    this.isProcessing = true;
    const data = this.queue.shift(); // Remove o primeiro item da fila

    // Aqui você pode implementar a lógica de processamento do item
    Logger.debug("Processando item da fila:", data);
    const cache = await this.cache.get(data);
    if (cache) {
      await this.cache.del(data);
      const products = await this.productService.listProducts();
      await this.cache.set(data, products);
    } else {
      const products = await this.productService.listProducts();
      await this.cache.set(data, products);
    }
    Logger.debug("Fila finalizada:", data);
    // Simule um atraso de processamento
    await new Promise((resolve) => setTimeout(resolve, 2000));

    this.processQueue(); // Chama recursivamente para processar o próximo item
  }
}
