import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AppService } from "./app.service";
import { AuthGuard } from "@nestjs/passport";
@Controller()
@ApiTags("Home")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: "access the home" })
  getHello(): object {
    return this.appService.getIndex();
  }
}
