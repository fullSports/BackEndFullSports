import { Model } from "mongoose";
import { ProviderController } from "./providers.controller";
import { ProviderService } from "./providers.service";
import { ProviderDocument } from "./Schema/providers.schema";

describe("ProvidersController", () => {
  let provideController: ProviderController;
  let providerService: ProviderService;
  let providerModel: Model<ProviderDocument>;
  beforeEach(() => {
    providerService = new ProviderService(providerModel);
    provideController = new ProviderController(providerService);
  });

  it("• Execultar ListProviders()", async () => {
    const ListProviders = provideController.ListProviders();
    expect(provideController.ListProviders());
  });
});
