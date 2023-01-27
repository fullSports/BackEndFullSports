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
  let IdOrder = String;
  let IdCLient = String;
  let IdPorduct = String;
  const clienteTestOrder = {
    cpf: "909.068.780-71",
    nome: "TDD user.controller",
    login: {
      email: "testOrderClient@outlook.com",
      password: "test68909",
      isAdmin: true,
    },
    dataNascimento: "20/20/2000",
    sexo: "M",
    cep: "20321-000",
    endereco: "Rua João do Test",
  };
  const ProductTestOrder = {
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
  it("• /cadastrar-cliente (POST) User", async () => {
    const RegisterUsers = await request(app.getHttpServer())
      .post("/cadastrar-cliente")
      .send(clienteTestOrder)
      .expect(201);
    expect(RegisterUsers.body).toHaveProperty("usuario" && "messagem");
    IdCLient = RegisterUsers.body.user._id;
    return RegisterUsers;
  });
  it("• /cadastrar-produto (POST)", async () => {
    const createdProduct = await request(app.getHttpServer())
      .post("/cadastrar-produto")
      .send(ProductTestOrder)
      .expect(201);
    IdPorduct = createdProduct.body.product._id;
    expect(createdProduct.body).toHaveProperty("product" && "messagem");
  });

  it("• /listar-pedidos (GET)", async () => {
    const ListOders = await request(app.getHttpServer())
      .get("/listar-pedidos")
      .expect(200)
      .expect(Array);
    return ListOders;
  });

  it("• /realizar-pedido (POST) ", async () => {
    const createdOrder = await request(app.getHttpServer())
      .post("/realizar-pedido")
      .send({
        quantidadePedido: 20,
        produto: IdPorduct,
        cliente: IdCLient,
      });
    IdOrder = createdOrder.body.order._id;
    expect(createdOrder.body).toHaveProperty("order" && "messagem");
  });

  it("• /listar-pedido/:id ", async () => {
    const listOrderId = await request(app.getHttpServer())
      .get(`/listar-pedido/${IdOrder}`)
      .expect(200)
      .expect(Object);
    return listOrderId;
  });

  it("• /atualizar-pedido/:id", async () => {
    const newOrder = {
      quantidade: 4,
    };
    const updateOrder = await request(app.getHttpServer())
      .put(`/atualizar-pedido/:id`)
      .send(newOrder);
  });
});
