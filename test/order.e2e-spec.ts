import { INestApplication } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthModule } from "src/auth/auth.module";
import {
  Recommendation,
  RrecommendationSchema,
} from "src/componentRecommendation /Schema/Rrecommendation.schema";
import { RecommendationController } from "src/componentRecommendation /recommendation.controller";
import { RecommendationService } from "src/componentRecommendation /recommendation.service";
import { ImagemSchema, imagem } from "src/image/Schema/image.schema";
import { ImageController } from "src/image/image.controller";
import { ImageService } from "src/image/image.service";
import { Order, OrderSchema } from "src/order/Schema/order.schema";
import { OrderController } from "src/order/order.controller";
import { OrderService } from "src/order/order.service";
import { Product, ProductSchema } from "src/product/Schema/product.schema";
import ProductController from "src/product/product.controller";
import { ProductServices } from "src/product/product.service";
import {
  Provider,
  ProviderSchema,
} from "src/providers/Schema/providers.schema";
import { UserSchema, Users } from "src/users/Schema/user.schema";
import { UserService } from "src/users/user.service";
import { UserController } from "src/users/users.controller";
import * as request from "supertest";
const urlConfig = require("./globalConfig.json");
const path = require("path");
describe("Product", () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(urlConfig.mongoUri),
        MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
        MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),

        MongooseModule.forFeature([
          { name: Product.name, schema: ProductSchema },
        ]),
        MongooseModule.forFeature([
          { name: imagem.name, schema: ImagemSchema },
        ]),
        MongooseModule.forFeature([
          { name: Provider.name, schema: ProviderSchema },
        ]),
        MongooseModule.forFeature([
          { name: Recommendation.name, schema: RrecommendationSchema },
        ]),
        AuthModule
      ],
      controllers: [
        OrderController,
        UserController,
        ProductController,
        ImageController,
      ],
      providers: [
        OrderService,
        ProductServices,
        RecommendationController,
        UserService,
        ProductServices,
        ImageService,
        RecommendationService,
      ],
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
    const acessToke = (await request(app.getHttpServer()).post('/auth/login-app').send({
      clientID: String(process.env.clientID),
      clientSecret: String(process.env.clientSecret)
    })).body.access_token;
    await request(app.getHttpServer())
      .get("/")
      .auth(String(acessToke), {
        type: 'bearer'
      })
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
    const acessToke = (await request(app.getHttpServer()).post('/auth/login-app').send({
      clientID: String(process.env.clientID),
      clientSecret: String(process.env.clientSecret)
    })).body.access_token;
    await request(app.getHttpServer())
      .get("/")
      .auth(String(acessToke), {
        type: 'bearer'
      })
    const RegisterUsers = await request(app.getHttpServer())
      .post("/cadastrar-cliente")
      .send(clienteTestOrder)
      .expect(201);
    expect(RegisterUsers.body).toHaveProperty("user" && "messagem");
    IdCLient = RegisterUsers.body.user._id;
    return RegisterUsers;
  });
  it("• /cadastrar-produto (POST)", async () => {
    const acessToke = (await request(app.getHttpServer()).post('/auth/login-app').send({
      clientID: String(process.env.clientID),
      clientSecret: String(process.env.clientSecret)
    })).body.access_token;
    await request(app.getHttpServer())
      .get("/")
      .auth(String(acessToke), {
        type: 'bearer'
      })
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
    const acessToke = (await request(app.getHttpServer()).post('/auth/login-app').send({
      clientID: String(process.env.clientID),
      clientSecret: String(process.env.clientSecret)
    })).body.access_token;
    await request(app.getHttpServer())
      .get("/")
      .auth(String(acessToke), {
        type: 'bearer'
      })
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
    const acessToke = (await request(app.getHttpServer()).post('/auth/login-app').send({
      clientID: String(process.env.clientID),
      clientSecret: String(process.env.clientSecret)
    })).body.access_token;
    await request(app.getHttpServer())
      .get("/")
      .auth(String(acessToke), {
        type: 'bearer'
      })
    const ListOders = await request(app.getHttpServer())
      .get("/listar-pedidos")
      .expect(200)
      .expect(Array);
    return ListOders;
  });
  it("• /listar-pedido/:id ", async () => {
    const acessToke = (await request(app.getHttpServer()).post('/auth/login-app').send({
      clientID: String(process.env.clientID),
      clientSecret: String(process.env.clientSecret)
    })).body.access_token;
    await request(app.getHttpServer())
      .get("/")
      .auth(String(acessToke), {
        type: 'bearer'
      })
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
    const acessToke = (await request(app.getHttpServer()).post('/auth/login-app').send({
      clientID: String(process.env.clientID),
      clientSecret: String(process.env.clientSecret)
    })).body.access_token;
    await request(app.getHttpServer())
      .get("/")
      .auth(String(acessToke), {
        type: 'bearer'
      })
    const deleteOrder = await request(app.getHttpServer())
      .delete(`/deletar-pedido/${IdOrder}`)
      .expect(200);
    expect(deleteOrder.body).toHaveProperty("messagem");
    return deleteOrder;
  });

  it("• /deletar-cleinte/:id && /deletar-produto/:id", async () => {
    const acessToke = (await request(app.getHttpServer()).post('/auth/login-app').send({
      clientID: String(process.env.clientID),
      clientSecret: String(process.env.clientSecret)
    })).body.access_token;
    await request(app.getHttpServer())
      .get("/")
      .auth(String(acessToke), {
        type: 'bearer'
      })
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
