import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { RecommendationService } from "./recommendation.service";
import { ApiTags } from "@nestjs/swagger";
import { Recommendation } from "./Schema/Rrecommendation.schema";
import { Product } from "src/product/Schema/product.schema";
import { AuthGuard } from "@nestjs/passport";
import { Cron, CronExpression } from "@nestjs/schedule";
@UseGuards(AuthGuard("jwt"))
@Controller()
@ApiTags("Recommendation Component")
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}
  @Get("/listar-recomendacoes")
  async ListRecommendations(): Promise<Recommendation[]> {
    return await this.recommendationService.listRecommedations();
  }
  @UseGuards(AuthGuard("jwt"))
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
  @UseGuards(AuthGuard("jwt"))
  @Get("/listar-recomendacao/:id")
  async ListRecommedationById(
    @Param("id") id: string
  ): Promise<Recommendation> {
    return await this.recommendationService.ListRecommedationById(id);
  }
  @UseGuards(AuthGuard("jwt"))
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
  @UseGuards(AuthGuard("jwt"))
  @Delete("/deletar-recomendacao/:id")
  async DeleteRecommedation(@Param("id") id: string) {
    await this.recommendationService.DeleteRecommendation(id);
    return {
      messagem: "Recomendação deletada com sucesso",
    };
  }
  @UseGuards(AuthGuard("jwt"))
  @Get("/recomendacao/:id")
  async Recommendation(
    @Param("id") id: string
  ): Promise<{ recommendations: Product[]; producstRemains: Product[] }> {
    return await this.recommendationService.Recommendation(id);
  }

  @Cron(CronExpression.MONDAY_TO_FRIDAY_AT_9PM)
  async ReiniciaREcomendacao() {
    Logger.debug("Called when the current second is 45");
    const list = await this.recommendationService.listRecommedations();
    for (const i of list) {
      const i2 = i as any;
      const id = i2._id as string;
      const user_id = i2.user._id as string;
      const updateRecommedation =
        await this.recommendationService.updateRecommedation(id, {
          click_calcados: 1,
          click_roupas: 1,
          click_equipamentos: 1,
          click_suplementos: 1,
          user: user_id,
        });
      Logger.log(updateRecommedation);
    }
  }
}
