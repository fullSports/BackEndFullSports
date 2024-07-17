import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  Recommendation,
  RecommendationDocumnet,
} from "./Schema/Rrecommendation.schema";
import { Model } from "mongoose";
import { Product } from "@product/Schema/product.schema";
import { ProductServices } from "@product/product.service";

@Injectable()
export class RecommendationService {
  constructor(
    @InjectModel(Recommendation.name)
    private readonly RecommendationModel: Model<RecommendationDocumnet>,
    private readonly ProductService: ProductServices
  ) {}

  async listRecommedations(): Promise<Recommendation[]> {
    const listRecommedations = await this.RecommendationModel.find()
      .populate("user")
      .exec();
    if (!listRecommedations) {
      throw new NotFoundException();
    }
    return listRecommedations;
  }

  async RegisterRecommedations(
    createRecommedation: Recommendation
  ): Promise<Recommendation> {
    const create = await this.RecommendationModel.create(createRecommedation);
    if (!create) {
      throw new NotFoundException();
    }
    return create;
  }

  async ListRecommedationById(id: string): Promise<Recommendation> {
    const ListRecommedationById = await this.RecommendationModel.findById({
      _id: id,
    }).exec();
    if (!ListRecommedationById) {
      throw new NotFoundException("recomendação inexistente");
    }
    return ListRecommedationById;
  }

  async updateRecommedation(
    id: string,
    updateRecommendation: Recommendation
  ): Promise<Recommendation> {
    const findBydId = await this.RecommendationModel.findById(id);
    if (!findBydId) {
      throw new NotFoundException("id da recomendação não encontrado");
    }
    const newRecommendation = {
      user: findBydId.user,
      click_calcados: updateRecommendation.click_calcados
        ? updateRecommendation.click_calcados
        : findBydId.click_calcados,
      click_suplementos: updateRecommendation.click_suplementos
        ? updateRecommendation.click_suplementos
        : findBydId.click_suplementos,
      click_roupas: updateRecommendation.click_roupas
        ? updateRecommendation.click_roupas
        : findBydId.click_roupas,
      click_equipamentos: updateRecommendation.click_equipamentos
        ? updateRecommendation.click_equipamentos
        : findBydId.click_equipamentos,
    };
    const updateRecommendationById =
      await this.RecommendationModel.findByIdAndUpdate(
        id,
        newRecommendation
      ).setOptions({ overwrite: false, new: true });
    if (!updateRecommendationById) throw new NotFoundException();
    return updateRecommendationById;
  }

  async DeleteRecommendation(id: string): Promise<Recommendation> {
    const DeleteRecommendation =
      await this.RecommendationModel.findByIdAndDelete(id);
    if (!DeleteRecommendation) throw new NotFoundException();
    else return DeleteRecommendation;
  }

  async Recommendation(
    id: string
  ): Promise<{ recommendations: Product[]; producstRemains: Product[] }> {
    const findBydId = await this.ListRecommedationById(id);

    const categories = {
      click_calcados: "calcado",
      click_equipamentos: "equipamento",
      click_roupas: "roupa",
      click_suplementos: "suplemento",
    };

    const higherNumberCategory = Object.keys(categories).reduce(
      (a, b) => (findBydId[a] > findBydId[b] ? a : b),
      Object.keys(categories)[0]
    );

    const findAllProducts = await this.ProductService.listProducts();
    const recommendations: Product[] = [];
    const producstRemains: Product[] = [];

    findAllProducts.forEach((product) => {
      const category = Object.keys(product.categoriaProduto)[0];
      if (category === categories[higherNumberCategory]) {
        recommendations.push(product);
      } else {
        producstRemains.push(product);
      }
    });

    return {
      recommendations,
      producstRemains,
    };
  }
}
