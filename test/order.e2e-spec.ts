import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
const path = require("path");
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
  let IImagem = String;
  const clienteTestOrder = {
    cpf: "567.904.554-00",
    nome: "TDD order- client",
    login: {
      email: "testOrderClient@outlook.com",
      password: "test68909",
      isAdmin: false,
    },
    dataNascimento: "20/20/2000",
    sexo: "M",
    cep: "15052-777",
    endereco: "Rua João do Test",
  };
  it("• /imagem (POST)", async () => {
    return await request(app.getHttpServer())
      .post("/imagem")
      .field("file", "img")
      .attach(
        "file",
        path.resolve(__dirname, "..", "test", "tmp", "e2e_nestjs.jpg")
      )
      .then(function (response) {
        expect(response.body).toHaveProperty("messsagem" && "image");
        expect(response.status).toBe(201);
        IImagem = response.body.image._id;
      });
  });
  it("• /cadastrar-cliente (POST) User", async () => {
    const RegisterUsers = await request(app.getHttpServer())
      .post("/cadastrar-cliente")
      .send(clienteTestOrder)
      .expect(201);
    expect(RegisterUsers.body).toHaveProperty("user" && "messagem");
    IdCLient = RegisterUsers.body.user._id;
    return RegisterUsers;
  });
  it("• /cadastrar-produto (POST)", async () => {
    const createdProduct = await request(app.getHttpServer())
      .post("/cadastrar-produto")
      .send({
        categoriaProduto: {
          equipamento: {
            nome: "oder - product eee",
            fornecedor: "63cb805f708a22c7a5f1110b",
            cor: "azul",
            sexo: "M",
            tamanho: 20,
            preco: "222",
            quantidade: 2222,
            imagemProduto: [IImagem],
          },
        },
      })
      .expect(201);
    IdPorduct = createdProduct.body.product._id;
    expect(createdProduct.body).toHaveProperty("product" && "messagem");
  });

  it("• /realizar-pedido (POST) ", async () => {
    const createdOrder = await request(app.getHttpServer())
      .post("/realizar-pedido")
      .send({
        quantidadePedido: 20,
        produto: IdPorduct,
        cliente: IdCLient,
        total: 20,
      })
      .expect(201);
    IdOrder = createdOrder.body.order._id;
    expect(createdOrder.body).toHaveProperty("order" && "messagem");
    expect(createdOrder.body).toHaveProperty("orderPlaced");
  });

  it("• /listar-pedidos (GET)", async () => {
    const ListOders = await request(app.getHttpServer())
      .get("/listar-pedidos")
      .expect(200)
      .expect(Array);
    return ListOders;
  });
  it("• /listar-pedido/:id ", async () => {
    const listOrderId = await request(app.getHttpServer())
      .get(`/listar-pedido/${IdOrder}`)
      .expect(200)
      .expect(Object);
    return listOrderId;
  });

  // desabilitado na api
  // it("• /atualizar-pedido/:id (PUT)", async () => {
  //   const newOrder = {
  //     quantidadePedido: 4,
  //     total: 4
  //   };
  //   const updateOrder = await request(app.getHttpServer())
  //     .put(`/atualizar-pedido/:id`)
  //     .send(newOrder)
  //     .expect(200)
  //     .expect(Object)

  //   expect(updateOrder.body.order.quantidadePedido !== 20)
  //   expect(updateOrder.body.order.total !== 20)
  // });

  it("• /deletar-pedido/:id (DELETE)", async () => {
    const deleteOrder = await request(app.getHttpServer())
      .delete(`/deletar-pedido/${IdOrder}`)
      .expect(200);
    expect(deleteOrder.body).toHaveProperty("messagem");
    return deleteOrder;
  });

  it("• /deletar-cleinte/:id && /deletar-produto/:id", async () => {
    await request(app.getHttpServer())
      .delete(`/deletar-produto/${IdPorduct}`)
      .expect(200);
    await request(app.getHttpServer())
      .delete(`/deletar-cliente/${IdCLient}`)
      .send({
        email: "testOrderClient@outlook.com",
        password: "test68909",
      })
      .expect(200);
  });
});
