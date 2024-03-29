import { Test, TestingModule } from "@nestjs/testing";
import { ProviderController } from "./providers.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ProviderService } from "./providers.service";
import { Provider, ProviderSchema } from "./Schema/providers.schema";
import { updateProviderDTO } from "./dto/updateProvider.dto";
import { UserService } from "src/users/user.service";
import { OrderService } from "src/order/order.service";
import { ImageService } from "src/image/image.service";
import { RecommendationService } from "src/componentRecommendation/recommendation.service";
import { ProductServices } from "src/product/product.service";
import { QueueCacheService } from "src/queues/jobs/queue.cache.service";
import { Product, ProductSchema } from "src/product/Schema/product.schema";
import { ImagemSchema, imagem } from "src/image/Schema/image.schema";
import {
  Recommendation,
  RrecommendationSchema,
} from "src/componentRecommendation/Schema/Rrecommendation.schema";
import { Order, OrderSchema } from "src/order/Schema/order.schema";
import { UserSchema, Users } from "src/users/Schema/user.schema";
import { CacheModule } from "@nestjs/common";
const urlConfig = require("../globalConfig.json");
describe("ProvidersController", () => {
  let providersController: ProviderController;
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
      controllers: [ProviderController],
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
    providersController = app.get<ProviderController>(ProviderController);
  });
  describe("👨‍💻 MethodsProviders:", () => {
    let registeredCustomer;
    const IProvider: Provider = {
      cnpj: "40.386.172/0001-60",
      nomeEmpresa: "TDD S.A",
      cep: "08452-000",
      endereco: "Rua joão do Teste",
      dataCadastro: new Date().toISOString(),
    };
    it("• CreateProvider()", async () => {
      const RegisterProvider = await providersController.CreateProvider(
        IProvider
      );
      expect(RegisterProvider).toHaveProperty(
        "messagem" && "registeredSuccess" && "provider"
      );
      expect(RegisterProvider.provider.cnpj == IProvider.cnpj);
      expect(RegisterProvider.provider.nomeEmpresa == IProvider.nomeEmpresa);
      expect(RegisterProvider.provider.cep == IProvider.cep);
      expect(RegisterProvider.provider.endereco == IProvider.endereco);
      registeredCustomer = RegisterProvider.provider;
    });
    it("• ListProviders()", async () => {
      const ListProviders = await providersController.ListProviders();
      expect(ListProviders[0].cnpj == IProvider.cnpj);
      expect(ListProviders[0].nomeEmpresa == IProvider.nomeEmpresa);
      expect(ListProviders[0].cep == IProvider.cep);
      expect(ListProviders[0].endereco == IProvider.endereco);
    });
    it("• SearchProviderById()", async () => {
      const SearchProviderById = await providersController.SearchProviderById(
        registeredCustomer._id
      );
      expect(SearchProviderById.cnpj == IProvider.cnpj);
      expect(SearchProviderById.nomeEmpresa == IProvider.nomeEmpresa);
      expect(SearchProviderById.cep == IProvider.cep);
      expect(SearchProviderById.endereco == IProvider.endereco);
    });
    it("• updateProviderById()", async () => {
      const UpdateProvider: updateProviderDTO = {
        _id: registeredCustomer._id,
        cnpj: "44.955.629/0001-60",
        nomeEmpresa: "TDD S.A",
        cep: "08452-000",
        endereco: "Rua joão do Teste",
      };
      const updateProvider = await providersController.updateProviderById(
        registeredCustomer._id,
        UpdateProvider
      );
      expect(updateProvider).toHaveProperty("messagem" && "provider");
      expect(updateProvider.provider.cnpj == UpdateProvider.cnpj);
      expect(updateProvider.provider.nomeEmpresa == UpdateProvider.nomeEmpresa);
      expect(updateProvider.provider.cep == UpdateProvider.cep);
      expect(updateProvider.provider.endereco == UpdateProvider.endereco);
    });
    it("• DeleteProviderById()", async () => {
      const DeleteProviderById = await providersController.DeleteProviderById(
        registeredCustomer._id
      );
      expect(DeleteProviderById).toHaveProperty("messagem");
    });
  });
});
