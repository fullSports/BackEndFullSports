import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../src/app.module";

describe("Product", () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  var ID = String;
  const Product = {
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

  it("• /caadastrar-produto (POST)", async () => {
    const createdProduct = await request(app.getHttpServer())
      .post("/cadastrar-produto")
      .send(Product)
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
