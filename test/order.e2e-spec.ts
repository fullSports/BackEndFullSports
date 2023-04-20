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
    nome: "TDD order- client",
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
        nome: "oder - product eee",
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
  // it("• /cadastrar-cliente (POST) User", async () => {
  //   const RegisterUsers = await request(app.getHttpServer())
  //     .post("/cadastrar-cliente")
  //     .send(clienteTestOrder)
  //     .expect(201);
  //   expect(RegisterUsers.body).toHaveProperty("user" && "messagem");
  //   IdCLient = RegisterUsers.body.user._id;
  //   return RegisterUsers;
  // });
  // it("• /cadastrar-produto (POST)", async () => {
  //   const createdProduct = await request(app.getHttpServer())
  //     .post("/cadastrar-produto")
  //     .send(ProductTestOrder)
  //     .expect(201);
  //   IdPorduct = createdProduct.body.product._id;
  //   expect(createdProduct.body).toHaveProperty("product" && "messagem");
  // });

  it("• /listar-pedidos (GET)", async () => {
    const ListOders = await request(app.getHttpServer())
      .get("/listar-pedidos")
      .expect(200)
      .expect(Array);
    console.log(IdCLient);
    console.log(IdPorduct);
    return ListOders;
  });
  const Order = {
    quantidadePedido: 20,
    produto: IdPorduct,
    cliente: IdCLient,
  };
  // it("• /realizar-pedido (POST) ", async () => {
  //   const createdOrder = await request(app.getHttpServer())
  //     .post("/realizar-pedido")
  //     .send(Order)
  //     .expect(201);
  //   IdOrder = createdOrder.body.order._id;
  //   expect(createdOrder.body).toHaveProperty("order" && "messagem");
  //   console.log(IdOrder);
  // });

  // it("• /listar-pedido/:id ", async () => {
  //   const listOrderId = await request(app.getHttpServer())
  //     .get(`/listar-pedido/${IdOrder}`)
  //     .expect(200)
  //     .expect(Object);
  //   return listOrderId;
  // });

  // it("• /atualizar-pedido/:id (PUT)", async () => {
  //   const newOrder = {
  //     quantidadePedido: 4,
  //   };
  //   const updateOrder = await request(app.getHttpServer())
  //     .put(`/atualizar-pedido/:id`)
  //     .send(newOrder)
  //     .expect(200)
  //     .expect(Object)

  //     // expect(updateOrder.body.order.quantidadePedido !== Order.quantidadePedido )
  // });

  // it("• /deletar-pedido/:id (DELETE)", async()=>{
  //     const deleteOrder = await request(app.getHttpServer())
  //       .delete(`/deletar-pedido/${IdOrder}`)
  //       .expect(200);
  //       expect(deleteOrder.body).toHaveProperty("messagem");
  //       return deleteOrder;
  // })

  // it("• /deletar-cleinte/:id && /deletar-produto/:id",async()=>{
  //   await request(app.getHttpServer())
  //     .delete(`/deletar-cleinte/${IdCLient}`)
  //     .expect(200)
  //   await request(app.getHttpServer())
  //     .delete(`/deletar-produto${IdPorduct}`)
  //     .expect(200)
  // })
});
