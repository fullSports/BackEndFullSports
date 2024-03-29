import { Test, TestingModule } from "@nestjs/testing";
import { OrderController } from "./order.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Order, OrderSchema } from "./Schema/order.schema";
import { UserSchema, Users } from "src/users/Schema/user.schema";
import { Product, ProductSchema } from "src/product/Schema/product.schema";
import { ImagemSchema, imagem } from "src/image/Schema/image.schema";
import {
  Provider,
  ProviderSchema,
} from "src/providers/Schema/providers.schema";
import { UserController } from "src/users/users.controller";
import ProductController from "src/product/product.controller";
import { ImageController } from "src/image/image.controller";
import { OrderService } from "./order.service";
import { ProductServices } from "src/product/product.service";
import { UserService } from "src/users/user.service";
import { ImageService } from "src/image/image.service";
import { RecommendationController } from "src/componentRecommendation/recommendation.controller";
import { RecommendationService } from "src/componentRecommendation/recommendation.service";
import {
  Recommendation,
  RrecommendationSchema,
} from "src/componentRecommendation/Schema/Rrecommendation.schema";
import { CacheModule } from "@nestjs/common";
import { QueueCacheService } from "src/queues/jobs/queue.cache.service";
import { ProviderService } from "src/providers/providers.service";
const urlConfig = require("../globalConfig.json");
const path = require("path");
describe("OrderController", () => {
  let orderController: OrderController;
  let userController: UserController;
  let productController: ProductController;
  let imageController: ImageController;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
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
      ],
      controllers: [
        OrderController,
        UserController,
        ProductController,
        ImageController,
      ],
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
    orderController = app.get<OrderController>(OrderController);
    userController = app.get<UserController>(UserController);
    productController = app.get<ProductController>(ProductController);
    imageController = app.get<ImageController>(ImageController);
  });
  describe("👨‍💻 Methods:", () => {
    let registeredCustomerOrder;
    let registeredCustomerCLient;
    let registeredCustomerPorduct: any;
    const registeredCustomerImagem = [];
    it("• uploudImage()", async () => {
      const UploadImage = await imageController.uploudImage(
        path.resolve(__dirname, "..", "..", "test", "tmp", "e2e_nestjs.jpg")
      );
      expect(UploadImage).toHaveProperty("messagem" && "image");
      registeredCustomerImagem.push(UploadImage.image._id);
      const UploadImage2 = await imageController.uploudImage(
        path.resolve(__dirname, "..", "..", "test", "tmp", "e2e_nestjs.jpg")
      );
      expect(UploadImage2).toHaveProperty("messagem" && "image");
      registeredCustomerImagem.push(UploadImage2.image._id);
    });
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
      imagemPerfil: null,
      dataCadastro: new Date().toISOString(),
    };
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
          imagemProduto: registeredCustomerImagem,
        },
        roupa: null,
        suplemento: null,
        calcado: null,
      },
      dataCadastro: new Date().toISOString(),
    };
    it("• run the method CreateUser()", async () => {
      const CreateUser = await userController.CreateUser(clienteTestOrder);
      expect(CreateUser).toHaveProperty(
        "messagem" && "registeredSuccess" && "user"
      );
      registeredCustomerCLient = CreateUser.user;
    });
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
      registeredCustomerPorduct = RegisterProduct.product;
    });
    it("• RegisterOrder()", async () => {
      const RegisterOrder = await orderController.RegisterOrder({
        quantidadePedido: 20,
        produto: registeredCustomerPorduct._id,
        cliente: registeredCustomerCLient._id,
        total: 20,
        dataCadastro: "",
      });
      expect(RegisterOrder).toHaveProperty(
        "messagem" && "order" && "orderPlaced"
      );
      registeredCustomerOrder = RegisterOrder.order;
    });
    it("• ListOrders()", async () => {
      const ListOders = await orderController.ListOrders();
      expect(ListOders[0].quantidadePedido == 20);
      expect(ListOders[0].quantidadePedido == 4440);
    });
    it("• ListOrderByID()", async () => {
      const ListOrderByID = await orderController.ListOrderByID(
        registeredCustomerOrder._id
      );
      expect(ListOrderByID == registeredCustomerOrder);
    });
    it("• DeleteOrder()", async () => {
      const DeleteOrder = await orderController.DeleteOrder(
        registeredCustomerOrder._id
      );
      expect(DeleteOrder).toHaveProperty("messagem");
    });
  });
});
