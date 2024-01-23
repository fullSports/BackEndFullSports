import {
  Body,
  Controller,
  Delete,
  Get,
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
@Controller()
@ApiTags("Products")
export default class ProductController {
  constructor(private readonly productService: ProductServices) {}
  @UseGuards(AuthGuard("jwt"))
  @Get("/listar-produtos")
  async ListProduct(): Promise<Product[]> {
    return await this.productService.listProducts();
  }
  @UseGuards(AuthGuard("jwt"))
  @Post("/cadastrar-produto")
  async CreateProduct(@Body() creatProduct: Product) {
    creatProduct["dataCadastro"] = new Date().toISOString();
    const createdProduct = await this.productService.RegisterProduct(
      creatProduct
    );

    return {
      product: createdProduct,
      messagem: "produto cadastrado com sucesso",
    };
  }
  @UseGuards(AuthGuard("jwt"))
  @Get("/listar-produto/:id")
  async SearchProductById(@Param("id") id: string): Promise<Product> {
    return this.productService.searchProductId(id);
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
    return {
      product: updateProductId,
      messagem: "produto atualizado com sucesso",
    };
  }
  @UseGuards(AuthGuard("jwt"))
  @Delete("/deletar-produto/:id")
  async deleteProduct(@Param("id") id: string) {
    await this.productService.deleteProduct(id);
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
