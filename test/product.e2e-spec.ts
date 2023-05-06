import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "src/product/Schema/product.schema";
import { imagem, ImagemSchema } from "src/image/Schema/image.schema";
import {
  Provider,
  ProviderSchema,
} from "src/providers/Schema/providers.schema";
import ProductController from "src/product/product.controller";
import { ProductServices } from "src/product/product.service";
const urlConfig = require("./globalConfig.json");
describe("Product", () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
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
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  let ID = String;
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
        imagemProduto: ["63cb60018de1a6e6a313806a", "63ccb02155b414ecfdc1e607"],
      },
    },
  };
  it("• /listar-produtos (GET)", async () => {
    const ListProduct = await request(app.getHttpServer())
      .get("/listar-produtos")
      .expect(200)
      .expect(Array);
    return ListProduct;
  });

  it("• /cadastrar-produto (POST)", async () => {
    const createdProduct = await request(app.getHttpServer())
      .post("/cadastrar-produto")
      .send(IProduct)
      .expect(201);
    ID = createdProduct.body.product._id;
    expect(createdProduct.body).toHaveProperty("product" && "messagem");
  });

  it("• /listar-produto/:id (GET)", async () => {
    const ListProductId = await request(app.getHttpServer())
      .get(`/listar-produto/${ID}`)
      .expect(200)
      .expect(Object);
    return ListProductId;
  });

  it("• /atualizar-produto/:id", async () => {
    const newProduct = {
      categoriaProduto: {
        roupa: {
          imagemProduto: ["63cb60018de1a6e6a313806a"],
        },
      },
    };
    const updateProduct = await request(app.getHttpServer())
      .put(`/atualizar-produto/${ID}`)
      .send(newProduct)
      .expect(200);
    expect(Object);
    expect(updateProduct.body).toHaveProperty("product" && "messagem");
  });

  it("• /deletar-produto/:id", async () => {
    const deleteProduct = await request(app.getHttpServer())
      .delete(`/deletar-produto/${ID}`)
      .expect(200);
    expect(deleteProduct.body).toHaveProperty("messagem");

    return deleteProduct;
  });
});
