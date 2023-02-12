import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { updateProviderDTO } from "./dto/updateProviderr.dto";
import { Provider, ProviderDocument } from "./Schema/providers.schema";
@Injectable()
export class ProviderService {
  constructor(
    @InjectModel(Provider.name)
    private readonly providerMode: Model<ProviderDocument>
  ) {}

  async ListProviders(): Promise<Provider[]> {
    const ListProviders = await this.providerMode.find().exec();
    if (!ListProviders) throw new NotFoundException();
    else return ListProviders;
  }

  async RegisterProvider(createProvider: Provider): Promise<Provider> {
    const { cnpj } = createProvider;
    const ListProviders = this.ListProviders();

    const providerTrue = (await ListProviders).filter(function (item) {
      return (item.cnpj = cnpj);
    });

    if (providerTrue.length === 0) {
      const newProvider = await this.providerMode.create(createProvider);
      if (!newProvider) throw new NotFoundException();
      else return newProvider;
    } else return null;
  }

  async searchIdProvider(id: string): Promise<Provider> {
    const searchId = await this.providerMode.findById({ _id: id }).exec();
    if (!searchId) throw new NotFoundException();
    else return searchId;
  }

  async updateProvider(
    id: string,
    updateProviderBody: updateProviderDTO
  ): Promise<Provider> {
    const findBydIdProvider = await this.providerMode.findById(id);
    const newProvider = {
      cnpj: updateProviderBody.cnpj
        ? updateProviderBody.cnpj
        : findBydIdProvider.cnpj,
      nomeEmpresa: updateProviderBody.nomeEmpresa
        ? updateProviderBody.nomeEmpresa
        : findBydIdProvider.nomeEmpresa,
      cep: updateProviderBody.cep
        ? updateProviderBody.cep
        : findBydIdProvider.cep,
      endereco: updateProviderBody.endereco
        ? updateProviderBody.endereco
        : findBydIdProvider.endereco,
    };
    const updateProvider = await this.providerMode
      .findByIdAndUpdate(id, newProvider)
      .setOptions({ overwrite: false, new: true });
    if (!updateProvider) {
      throw new NotFoundException();
    }
    return updateProvider;
  }

  async deleteProvider(id: string): Promise<Provider> {
    const deleteProvider = await this.providerMode
      .findByIdAndRemove({ _id: id })
      .exec();
    if (!deleteProvider) throw new NotFoundException();
    else return deleteProvider;
  }
}
