import { Test, TestingModule } from "@nestjs/testing";
import ProductController from "./product.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductServices } from "./product.service";
import { Product, ProductSchema } from "./Schema/product.schema";
import { ImagemSchema, imagem } from "src/image/Schema/image.schema";
import {
  Provider,
  ProviderSchema,
} from "src/providers/Schema/providers.schema";
import { updateProductDTO } from "./dto/updateProduct.dto";
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
    const IProduct: Product = {
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
        roupa: null,
        suplemento: null,
        calcado: null,
      },
      dataCadastro: new Date().toISOString(),
    };
    it("• CreateProduct()", async () => {
      const RegisterProduct = await productController.CreateProduct(IProduct);
      expect(RegisterProduct).toHaveProperty("product" && "messagem");
      expect(
        RegisterProduct.product.categoriaProduto.equipamento.nome ==
          IProduct.categoriaProduto.equipamento.nome
      );
      expect(
        RegisterProduct.product.categoriaProduto.equipamento.cor ==
          IProduct.categoriaProduto.equipamento.cor
      );
      expect(
        RegisterProduct.product.categoriaProduto.equipamento.sexo ==
          IProduct.categoriaProduto.equipamento.sexo
      );
      expect(
        RegisterProduct.product.categoriaProduto.equipamento.tamanho ==
          IProduct.categoriaProduto.equipamento.tamanho
      );
      expect(
        RegisterProduct.product.categoriaProduto.equipamento.preco ==
          IProduct.categoriaProduto.equipamento.preco
      );
      expect(
        RegisterProduct.product.categoriaProduto.equipamento.quantidade ==
          IProduct.categoriaProduto.equipamento.quantidade
      );
      registeredCustomer = RegisterProduct.product;
    });
    it("• ListProduct()", async () => {
      const ListProduct = await productController.ListProduct();
      expect(
        ListProduct[0].categoriaProduto.equipamento.nome ==
          IProduct.categoriaProduto.equipamento.nome
      );
      expect(
        ListProduct[0].categoriaProduto.equipamento.cor ==
          IProduct.categoriaProduto.equipamento.cor
      );
      expect(
        ListProduct[0].categoriaProduto.equipamento.sexo ==
          IProduct.categoriaProduto.equipamento.sexo
      );
      expect(
        ListProduct[0].categoriaProduto.equipamento.tamanho ==
          IProduct.categoriaProduto.equipamento.tamanho
      );
      expect(
        ListProduct[0].categoriaProduto.equipamento.preco ==
          IProduct.categoriaProduto.equipamento.preco
      );
      expect(
        ListProduct[0].categoriaProduto.equipamento.quantidade ==
          IProduct.categoriaProduto.equipamento.quantidade
      );
    });
    it("• SearchProductById()", async () => {
      const SearchProductById = await productController.SearchProductById(
        registeredCustomer._id
      );
      expect(
        SearchProductById.categoriaProduto.equipamento.nome ==
          IProduct.categoriaProduto.equipamento.nome
      );
      expect(
        SearchProductById.categoriaProduto.equipamento.cor ==
          IProduct.categoriaProduto.equipamento.cor
      );
      expect(
        SearchProductById.categoriaProduto.equipamento.sexo ==
          IProduct.categoriaProduto.equipamento.sexo
      );
      expect(
        SearchProductById.categoriaProduto.equipamento.tamanho ==
          IProduct.categoriaProduto.equipamento.tamanho
      );
      expect(
        SearchProductById.categoriaProduto.equipamento.preco ==
          IProduct.categoriaProduto.equipamento.preco
      );
      expect(
        SearchProductById.categoriaProduto.equipamento.quantidade ==
          IProduct.categoriaProduto.equipamento.quantidade
      );
    });
    it("• updateProductId()", async () => {
      const UpdateProduct: updateProductDTO = {
        _id: registeredCustomer._id,
        categoriaProduto: {
          equipamento: {
            nome: "suplemento 2",
            fornecedor: "63cb805f708a22c7a5f1110b",
            cor: "verde",
            sexo: "M",
            tamanho: 20,
            preco: "222",
            quantidade: 2222,
            imagemProduto: [
              "63cb60018de1a6e6a313806a",
              "63ccb02155b414ecfdc1e607",
            ],
          },
          roupa: null,
          suplemento: null,
          calcado: null,
        },
      };
      const updateProduct = await productController.updateProductId(
        registeredCustomer._id,
        UpdateProduct
      );
      expect(updateProduct).toHaveProperty("product" && "messagem");
      expect(
        updateProduct.product.categoriaProduto.equipamento.nome ==
          UpdateProduct.categoriaProduto.equipamento.nome
      );
      expect(
        updateProduct.product.categoriaProduto.equipamento.nome !=
          IProduct.categoriaProduto.equipamento.nome
      );
    });
    it("• deleteProduct()", async () => {
      const deleteProductById = await productController.deleteProduct(
        registeredCustomer._id
      );
      expect(deleteProductById).toHaveProperty("messagem");
    });
  });
});
