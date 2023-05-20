import { Controller, Get } from "@nestjs/common";
import { RrecommendationService } from "./recommendation.service";

@Controller()
export class RrecommendationController {
  constructor(private readonly recommendationService: RrecommendationService) {}
  @Get("/teste")
  async teste() {
    return await this.recommendationService.Recommendation("ee");
  }
}
