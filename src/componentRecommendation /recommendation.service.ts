import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Recommendation, RecommendationDocumnet } from "./Schema/Rrecommendation.schema";
import { Model } from "mongoose";

@Injectable()
export class RrecommendationService {
    constructor(@InjectModel(Recommendation.name)
    private readonly RecommendationModel: Model<RecommendationDocumnet>
    ) { }


    async listRecommedations(): Promise<Recommendation[]> {
        const listRecommedations = await this.RecommendationModel.find()
            .populate("user")
            .exec();
        if (!listRecommedations) throw new NotFoundException();
        else return listRecommedations;
    }

    async RegisterRecommedations(createRecommedation: Recommendation): Promise<Recommendation> {
        const create = await this.RecommendationModel.create(createRecommedation);
        if (!create) throw new NotFoundException()
        else return create;
    }

    async ListRecommedationById(id: string): Promise<Recommendation> {
        const ListRecommedationById = await this.RecommendationModel.findById({ _id: id }).exec();
        if (!ListRecommedationById) throw new NotFoundException('recomendação inexistente')
        else return ListRecommedationById;
    }

    async updateRecommedation(id: string, updateRecommendation: Recommendation): Promise<Recommendation> {
        const findBydId = await this.RecommendationModel.findById(id)
        if (!findBydId) throw new NotFoundException('id da recomendação não encontrado')
        else {
            const newRecommendation = {
                user: findBydId.user,
                click_calcados: updateRecommendation.click_calcados ? updateRecommendation.click_calcados : findBydId.click_calcados,
                click_suplementos: updateRecommendation.click_suplementos ? updateRecommendation.click_suplementos : findBydId.click_suplementos,
                click_roupas: updateRecommendation.click_roupas ? updateRecommendation.click_roupas : findBydId.click_roupas,
                click_equipamentos: updateRecommendation.click_equipamentos ? updateRecommendation.click_equipamentos : findBydId.click_equipamentos
            }
            const updateRecommendationById = await this.RecommendationModel.findByIdAndUpdate(id, newRecommendation)
                .setOptions({ overwrite: false, new: true });
            if (!updateRecommendationById) throw new NotFoundException();
            else return updateRecommendationById;
        }
    }

    async DeleteRecommendation(id: string): Promise<Recommendation> {
        const DeleteRecommendation = await this.RecommendationModel.findByIdAndDelete(id)
        if (!DeleteRecommendation) throw new NotFoundException()
        else return DeleteRecommendation;
    }

    
}