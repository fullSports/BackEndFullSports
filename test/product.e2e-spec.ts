import { CacheModule, INestApplication } from "@nestjs/common";
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
import { AuthModule } from "src/auth/auth.module";
import {
  Recommendation,
  RrecommendationSchema,
} from "src/componentRecommendation/Schema/Rrecommendation.schema";
import { Order, OrderSchema } from "src/order/Schema/order.schema";
import { UserSchema, Users } from "src/users/Schema/user.schema";
import { QueueCacheService } from "src/queues/jobs/queue.cache.service";
import { RecommendationService } from "src/componentRecommendation/recommendation.service";
import { ImageService } from "src/image/image.service";
import { OrderService } from "src/order/order.service";
import { UserService } from "src/users/user.service";
import { ProviderService } from "src/providers/providers.service";
const urlConfig = require("./globalConfig.json");
describe("Product", () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(urlConfig.mongoUri),
        MongooseModule.forFeature([
          { name: Product.name, schema: ProductSchema },
          { name: imagem.name, schema: ImagemSchema },
          { name: Provider.name, schema: ProviderSchema },
          { name: Recommendation.name, schema: RrecommendationSchema },
          { name: Order.name, schema: OrderSchema },
          { name: Users.name, schema: UserSchema },
        ]),
        CacheModule.register({
          ttl: 999999,
          isGlobal: true,
        }),
        AuthModule,
      ],
      controllers: [ProductController],
      providers: [
        ProductServices,
        QueueCacheService,
        RecommendationService,
        ImageService,
        OrderService,
        ProviderService,
        UserService,
      ],
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
    const acessToke = (
      await request(app.getHttpServer())
        .post("/auth/login-app")
        .send({
          client_id: String(process.env.clientId),
          client_secret: String(process.env.clientSecret),
        })
    ).body.access_token;
    const ListProduct = await request(app.getHttpServer())
      .get("/listar-produtos")
      .auth(String(acessToke), {
        type: "bearer",
      })
      .expect(200)
      .expect(Array);
    return ListProduct;
  });

  it("• /cadastrar-produto (POST)", async () => {
    const acessToke = (
      await request(app.getHttpServer())
        .post("/auth/login-app")
        .send({
          client_id: String(process.env.clientId),
          client_secret: String(process.env.clientSecret),
        })
    ).body.access_token;
    const createdProduct = await request(app.getHttpServer())
      .post("/cadastrar-produto")
      .auth(String(acessToke), {
        type: "bearer",
      })
      .send(IProduct)
      .expect(201);
    ID = createdProduct.body.product._id;
    expect(createdProduct.body).toHaveProperty("product" && "messagem");
  });

  it("• /listar-produto/:id (GET)", async () => {
    const acessToke = (
      await request(app.getHttpServer())
        .post("/auth/login-app")
        .send({
          client_id: String(process.env.clientId),
          client_secret: String(process.env.clientSecret),
        })
    ).body.access_token;
    const ListProductId = await request(app.getHttpServer())
      .get(`/listar-produto/${ID}`)
      .auth(String(acessToke), {
        type: "bearer",
      })
      .expect(200)
      .expect(Object);
    return ListProductId;
  });

  it("• /atualizar-produto/:id", async () => {
    const acessToke = (
      await request(app.getHttpServer())
        .post("/auth/login-app")
        .send({
          client_id: String(process.env.clientId),
          client_secret: String(process.env.clientSecret),
        })
    ).body.access_token;
    const newProduct = {
      categoriaProduto: {
        roupa: {
          imagemProduto: ["63cb60018de1a6e6a313806a"],
        },
      },
    };
    const updateProduct = await request(app.getHttpServer())
      .put(`/atualizar-produto/${ID}`)
      .auth(String(acessToke), {
        type: "bearer",
      })
      .send(newProduct)
      .expect(200);
    expect(Object);
    expect(updateProduct.body).toHaveProperty("product" && "messagem");
  });
  it("• /buscar-produto/:busca", async () => {
    const acessToke = (
      await request(app.getHttpServer())
        .post("/auth/login-app")
        .send({
          client_id: String(process.env.clientId),
          client_secret: String(process.env.clientSecret),
        })
    ).body.access_token;
    const searchProduct = await request(app.getHttpServer())
      .get("/buscar-produto/suplemento")
      .auth(String(acessToke), {
        type: "bearer",
      })
      .expect(200);
    expect(Array);
    expect(searchProduct.body.length).toBe(1);
  });

  it("• /deletar-produto/:id", async () => {
    const acessToke = (
      await request(app.getHttpServer())
        .post("/auth/login-app")
        .send({
          client_id: String(process.env.clientId),
          client_secret: String(process.env.clientSecret),
        })
    ).body.access_token;
    const deleteProduct = await request(app.getHttpServer())
      .delete(`/deletar-produto/${ID}`)
      .auth(String(acessToke), {
        type: "bearer",
      })
      .expect(200);
    expect(deleteProduct.body).toHaveProperty("messagem");

    return deleteProduct;
  });
});
