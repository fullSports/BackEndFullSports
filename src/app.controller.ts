import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AppService } from "./app.service";
require("dotenv").config();
@Controller()
@ApiTags("Home")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: "access the home" })
  getHello(): object {
    return this.appService.getIndex();
  }
}
