import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { RecommendationService } from "./recommendation.service";
import { ApiTags } from "@nestjs/swagger";
import { Recommendation } from "./Schema/Rrecommendation.schema";
import { Product } from "src/product/Schema/product.schema";

@Controller()
@ApiTags("Recommendation Component")
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}
  @Get("/listar-recomendacoes")
  async ListRecommendations(): Promise<Recommendation[]> {
    return await this.recommendationService.listRecommedations();
  }

  @Post("/cadastrar-recomendacao")
  async CreateRecommendation(@Body() craateRecommendaton: Recommendation) {
    const createRecommedation =
      await this.recommendationService.RegisterRecommedations(
        craateRecommendaton
      );
    return {
      recommedation: createRecommedation,
      messagem: "Recomendação criada com sucesso",
    };
  }

  @Get("/listar-recomendacao/:id")
  async ListRecommedationById(
    @Param("id") id: string
  ): Promise<Recommendation> {
    return await this.recommendationService.ListRecommedationById(id);
  }

  @Put("/atualizar-recomendacao/:id")
  async UpdateRecommedation(
    @Param("id") id: string,
    @Body() updateRecommedation: Recommendation
  ) {
    const UpdateRecommedation =
      await this.recommendationService.updateRecommedation(
        id,
        updateRecommedation
      );

    return {
      recommendation: UpdateRecommedation,
      messagem: "Recomendação atualizada com sucesso",
    };
  }
  @Delete("/deletar-recomendacao/:id")
  async DeleteRecommedation(@Param("id") id: string) {
    await this.recommendationService.DeleteRecommendation(id);
    return {
      messagem: "Recomendação deletada com sucesso",
    };
  }

  @Get("/recomendacao/:id")
  async Recommendation(@Param("id") id: string): Promise<Product[]> {
    return await this.recommendationService.Recommendation(id);
  }
}
