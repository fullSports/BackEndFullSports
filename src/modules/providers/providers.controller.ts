import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { updateProviderDTO } from "./dto/updateProvider.dto";
import { ProviderService } from "./providers.service";
import { Provider } from "./Schema/providers.schema";
@Controller()
@ApiTags("Providers")
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Get("/listar-fornecedores")
  async ListProviders(): Promise<Provider[]> {
    return this.providerService.ListProviders();
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
      return {
        provider: createdProvider,
        messagem: "fornecedor cadastrado com sucesso",
        registeredSuccess: true,
      };
    }
  }

  @Get("/listar-fornecedor/:id")
  async SearchProviderById(@Param("id") id: string): Promise<Provider> {
    return this.providerService.searchIdProvider(id);
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
    return {
      provider: updateProviderId,
      messagem: "fornecedor atualizado com sucesso",
    };
  }

  @Delete("/deletar-fornecedor/:id")
  async DeleteProviderById(@Param("id") id: string) {
    const deleteProvider = await this.providerService.deleteProvider(id);
    if (deleteProvider)
      return {
        messagem: "fornecedor deletado com sucesso",
      };
  }
}
