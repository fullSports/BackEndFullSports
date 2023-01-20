import { Controller, Get } from "@nestjs/common";
import { ProductServices } from "./product.service";
@Controller()
export class ProductController {
  constructor(private readonly productService: ProductServices) {}
}
