import {
  Body,
  CACHE_MANAGER,
  Controller,
  Delete,
  Get,
  Inject,
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
import { QueueCacheService } from "src/queues/jobs/queue.cache.service";
import { Cache } from "cache-manager";
import { RequestsEnum } from "src/queues/enum/request.enum";
@UseGuards(AuthGuard("jwt"))
@Controller()
@ApiTags("Recommendation Component")
export class RecommendationController {
  constructor(
    private readonly recommendationService: RecommendationService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly queueCacheService: QueueCacheService
  ) {}
  @Get("/listar-recomendacoes")
  async ListRecommendations(): Promise<Recommendation[]> {
    const recomemendation_cache = await this.cache.get(
      RequestsEnum.componentRecommendation
    );
    if (recomemendation_cache) {
      return recomemendation_cache;
    } else {
      const recommendations =
        await this.recommendationService.listRecommedations();
      await this.cache.set(
        RequestsEnum.componentRecommendation,
        recommendations
      );
      return recommendations;
    }
  }
  @UseGuards(AuthGuard("jwt"))
  @Post("/cadastrar-recomendacao")
  async CreateRecommendation(@Body() craateRecommendaton: Recommendation) {
    const createRecommedation =
      await this.recommendationService.RegisterRecommedations(
        craateRecommendaton
      );
    this.queueCacheService.addItem(RequestsEnum.componentRecommendation);
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
    const recommendationId_cache = await this.cache.get(
      `${RequestsEnum.componentRecommendation}-${id}`
    );
    if (recommendationId_cache) {
      return recommendationId_cache;
    } else {
      const recommendationId =
        await this.recommendationService.ListRecommedationById(id);
      await this.cache.set(`${RequestsEnum.componentRecommendation}-${id}`);
      return recommendationId;
    }
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
    this.queueCacheService.addItem(RequestsEnum.componentRecommendation);
    this.queueCacheService.addItem(
      `${RequestsEnum.componentRecommendation}-${id}`
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
    this.queueCacheService.addItem(RequestsEnum.componentRecommendation);
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
    Logger.debug("Atualizando dados para recomendação");
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
