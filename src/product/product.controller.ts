import {
  Body,
  CACHE_MANAGER,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { updateProductDTO } from "./dto/updateProduct.dto";
import { ProductServices } from "./product.service";
import { Product } from "./Schema/product.schema";
import { AuthGuard } from "@nestjs/passport";
import { Cache } from "cache-manager";
import { QueueCacheService } from "src/queue/jobs/queue.cache.service";
import { RequestsEnum } from "src/queue/enum/request.enum";
@Controller()
@ApiTags("Products")
export default class ProductController {
  constructor(
    private readonly productService: ProductServices,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly queueCacheService: QueueCacheService
  ) {}
  @UseGuards(AuthGuard("jwt"))
  @Get("/listar-produtos")
  async ListProduct(): Promise<Product[]> {
    const products_cache = await this.cache.get(RequestsEnum.product);
    if (products_cache) {
      return products_cache;
    } else {
      const products = await this.productService.listProducts();
      await this.cache.set(RequestsEnum.product, products);
      return products;
    }
  }
  @UseGuards(AuthGuard("jwt"))
  @Post("/cadastrar-produto")
  async CreateProduct(@Body() creatProduct: Product) {
    creatProduct["dataCadastro"] = new Date().toISOString();
    const createdProduct = await this.productService.RegisterProduct(
      creatProduct
    );
    this.queueCacheService.addItem(RequestsEnum.product);
    return {
      product: createdProduct,
      messagem: "produto cadastrado com sucesso",
    };
  }
  @UseGuards(AuthGuard("jwt"))
  @Get("/listar-produto/:id")
  async SearchProductById(@Param("id") id: string): Promise<Product> {
    const productId_cache = await this.cache.get(
      `${RequestsEnum.product}-${id}`
    );
    if (productId_cache) {
      return productId_cache;
    } else {
      const productId = await this.productService.searchProductId(id);
      await this.cache.set(`${RequestsEnum.product}-${id}`);
      return productId;
    }
  }
  @UseGuards(AuthGuard("jwt"))
  @Put("/atualizar-produto/:id")
  async updateProductId(
    @Param("id") id: string,
    @Body() updateProduct: updateProductDTO
  ) {
    const updateProductId = await this.productService.updateProduct(
      id,
      updateProduct
    );
    this.queueCacheService.addItem(RequestsEnum.product);
    return {
      product: updateProductId,
      messagem: "produto atualizado com sucesso",
    };
  }
  @UseGuards(AuthGuard("jwt"))
  @Delete("/deletar-produto/:id")
  async deleteProduct(@Param("id") id: string) {
    await this.productService.deleteProduct(id);
    this.queueCacheService.addItem(RequestsEnum.product);
    return {
      messagem: "Produto deletado com sucesso ",
    };
  }
  @UseGuards(AuthGuard("jwt"))
  @Get("/buscar-produto/:busca")
  async searchProducts(@Param("busca") search: string) {
    return await this.productService.searchProducts(search);
  }
}
