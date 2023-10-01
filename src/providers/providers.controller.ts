import {
  Body,
  CACHE_MANAGER,
  Controller,
  Delete,
  Get,
  Inject,
  NotAcceptableException,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { updateProviderDTO } from "./dto/updateProvider.dto";
import { ProviderService } from "./providers.service";
import { Provider } from "./Schema/providers.schema";
import { QueueCacheService } from "src/queues/jobs/queue.cache.service";
import { Cache } from "cache-manager";
import { RequestsEnum } from "src/queues/enum/request.enum";
@Controller()
@ApiTags("Providers")
export class ProviderController {
  constructor(
    private readonly providerService: ProviderService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly queueCacheService: QueueCacheService
  ) {}

  @Get("/listar-fornecedores")
  async ListProviders(): Promise<Provider[]> {
    const providers_cache = await this.cache.get(RequestsEnum.providers);
    if (providers_cache) {
      return providers_cache;
    } else {
      const providers = await this.providerService.ListProviders();
      await this.cache.set(RequestsEnum.providers, providers);
      return providers;
    }
  }

  @Post("/cadastrar-fornecedor")
  async CreateProvider(@Body() createProvider: Provider) {
    createProvider["dataCadastro"] = new Date().toISOString();
    const createdProvider = await this.providerService.RegisterProvider(
      createProvider
    );
    if (!createdProvider) {
      return {
        messagem: "cnpj de fornecedor já cadastrado",
        registeredSuccess: false,
      };
    } else {
      this.queueCacheService.addItem(RequestsEnum.providers);
      return {
        provider: createdProvider,
        messagem: "fornecedor cadastrado com sucesso",
        registeredSuccess: true,
      };
    }
  }

  @Get("/listar-fornecedor/:id")
  async SearchProviderById(@Param("id") id: string): Promise<Provider> {
    const providerId_cache = await this.cache.get(
      `${RequestsEnum.providers}-${id}`
    );
    if (providerId_cache) {
      return providerId_cache;
    } else {
      const providerId = await this.providerService.searchIdProvider(id);
      await this.cache.set(`${RequestsEnum.providers}-${id}`);
      return providerId;
    }
  }

  @Put("/atualizar-fornecedor/:id")
  async updateProviderById(
    @Param("id") id: string,
    @Body() updateProvider: updateProviderDTO
  ) {
    const updateProviderId = await this.providerService.updateProvider(
      id,
      updateProvider
    );
    this.queueCacheService.addItem(RequestsEnum.providers);
    this.queueCacheService.addItem(`${RequestsEnum.providers}-${id}`);
    return {
      provider: updateProviderId,
      messagem: "fornecedor atualizado com sucesso",
    };
  }

  @Delete("/deletar-fornecedor/:id")
  async DeleteProviderById(@Param("id") id: string) {
    const deleteProvider = await this.providerService.deleteProvider(id);
    if (deleteProvider) {
      this.queueCacheService.addItem(RequestsEnum.providers);
      return {
        messagem: "fornecedor deletado com sucesso",
      };
    } else {
      throw new NotAcceptableException();
    }
  }
}
