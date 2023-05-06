import { Test, TestingModule } from "@nestjs/testing";
import ProductController from "./product.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductServices } from "./product.service";
import { describe } from "node:test";
import { Product, ProductSchema } from "./Schema/product.schema";
import { ImagemSchema, imagem } from "src/image/Schema/image.schema";
import {
  Provider,
  ProviderSchema,
} from "src/providers/Schema/providers.schema";

const urlConfig = require("../globalConfig.json");
describe("ProductController", () => {
  let productController: ProductController;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(urlConfig.mongoUri),
        MongooseModule.forFeature([
          { name: Product.name, schema: ProductSchema },
        ]),
        MongooseModule.forFeature([
          { name: imagem.name, schema: ImagemSchema },
        ]),
        MongooseModule.forFeature([
          { name: Provider.name, schema: ProviderSchema },
        ]),
      ],
      controllers: [ProductController],
      providers: [ProductServices],
    }).compile();
    productController = app.get<ProductController>(ProductController);
  });
  describe("👨‍💻 MethodsProduct:", () => {
    let registeredCustomer;
    const IProduct = {
      categoriaProduto: {
        equipamento: {
          nome: "suplemento eee",
          fornecedor: "63cb805f708a22c7a5f1110b",
          cor: "azul",
          sexo: "M",
          tamanho: 20,
          preco: "222",
          quantidade: 2222,
          imagemProduto: [
            "63cb60018de1a6e6a313806a",
            "63ccb02155b414ecfdc1e607",
          ],
        },
      },
    };
    it("• CreateProduct()")
  });
});
