import { Test, TestingModule } from "@nestjs/testing";
import { RecommendationController } from "./recommendation.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {
  Recommendation,
  RrecommendationSchema,
} from "./Schema/Rrecommendation.schema";
import { UserSchema, Users } from "src/users/Schema/user.schema";
import { ProductServices } from "src/product/product.service";
import { Product, ProductSchema } from "src/product/Schema/product.schema";
import { ImagemSchema, imagem } from "src/image/Schema/image.schema";
import {
  Provider,
  ProviderSchema,
} from "src/providers/Schema/providers.schema";
import { RecommendationService } from "./recommendation.service";
import { UserController } from "src/users/users.controller";
import { UserService } from "src/users/user.service";
import { Order, OrderSchema } from "src/order/Schema/order.schema";
import { CacheModule } from "@nestjs/common";
import { QueueCacheService } from "src/queues/jobs/queue.cache.service";
import { ImageService } from "src/image/image.service";
import { OrderService } from "src/order/order.service";
import { ProviderService } from "src/providers/providers.service";
const urlConfig = require("../globalConfig.json");
describe("RecommendationController", () => {
  let recommendationController: RecommendationController;
  let userController: UserController;
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
      controllers: [RecommendationController, UserController],
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
    recommendationController = app.get<RecommendationController>(
      RecommendationController
    );
    userController = app.get<UserController>(UserController);
  });

  describe("👨‍💻 MethodsRecommendation:", () => {
    let Recommendation;
    let userCreated;
    it("• run the method CreateRecommendation()", async () => {
      const _idUser = (await userController.CreateUser({
        cpf: "909.068.780-71",
        nome: "TDD user.controller",
        login: {
          email: "test@outlook.com",
          password: "test123456",
          isAdmin: true,
        },
        dataNascimento: "20/20/2000",
        sexo: "M",
        cep: "20321-000",
        endereco: "Rua João do Test",
        imagemPerfil: null,
        dataCadastro: new Date().toISOString(),
      })) as any;
      userCreated = _idUser;
      const recommendation = {
        click_calcados: 1,
        click_equipamentos: 1,
        click_roupas: 1,
        click_suplementos: 1,
        user: _idUser.user._id,
      };
      const CreateRecommendation =
        await recommendationController.CreateRecommendation(recommendation);
      Recommendation = CreateRecommendation.recommedation;
      expect(CreateRecommendation).toHaveProperty(
        "messagem" && "recommedation"
      );
    });
    it("• ListRecommendations()", async () => {
      const ListRecommendations =
        await recommendationController.ListRecommendations();
      expect(
        ListRecommendations[0].click_calcados == Recommendation.click_calcados
      );
      expect(
        ListRecommendations[0].click_equipamentos ==
          Recommendation.click_equipamentos
      );
      expect(
        ListRecommendations[0].click_roupas == Recommendation.click_roupas
      );
      expect(
        ListRecommendations[0].click_suplementos ==
          Recommendation.click_suplementos
      );
      expect(ListRecommendations[0].user == userCreated);
    });
    it("• ListRecommedationById()", async () => {
      const ListRecommedationById =
        await recommendationController.ListRecommedationById(
          Recommendation._id
        );
      expect(
        ListRecommedationById.click_calcados == Recommendation.click_calcados
      );
      expect(
        ListRecommedationById.click_equipamentos ==
          Recommendation.click_equipamentos
      );
      expect(ListRecommedationById.click_roupas == Recommendation.click_roupas);
      expect(
        ListRecommedationById.click_suplementos ==
          Recommendation.click_suplementos
      );
      expect(ListRecommedationById.user == userCreated);
    });
    it("• UpdateRecommedation()", async () => {
      const UpdateRecommedation =
        await recommendationController.UpdateRecommedation(Recommendation._id, {
          click_calcados: 2,
          click_equipamentos: 2,
          click_roupas: 2,
          click_suplementos: 2,
          user: userCreated._id,
        });
      expect(UpdateRecommedation).toHaveProperty(
        "recommendation" && "messagem"
      );
      expect(
        UpdateRecommedation.recommendation.click_calcados !=
          Recommendation.click_calcados
      );
      expect(
        UpdateRecommedation.recommendation.click_equipamentos !=
          Recommendation.click_equipamentos
      );
      expect(
        UpdateRecommedation.recommendation.click_roupas !=
          Recommendation.click_roupas
      );
      expect(
        UpdateRecommedation.recommendation.click_suplementos !=
          Recommendation.click_suplementos
      );
      expect(UpdateRecommedation.recommendation.user == userCreated);
    });
    it("• Recommendation()", async () => {
      const recommendation = await recommendationController.Recommendation(
        Recommendation._id
      );
      expect(recommendation).toHaveProperty(
        "recommendations" && "producstRemains"
      );
      expect(recommendation.recommendations.length == 0);
      expect(recommendation.producstRemains.length == 0);
    });

    it("• DeleteRecommedation()", async () => {
      const DeleteRecommedation =
        await recommendationController.DeleteRecommedation(Recommendation._id);
      expect(DeleteRecommedation).toHaveProperty("messagem");
    });
  });
});
