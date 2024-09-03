import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiExcludeEndpoint } from "@nestjs/swagger";
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("login-app")
  @ApiExcludeEndpoint()
  async LoginApp(@Body() body: { client_id: string; client_secret: string }) {
    const app: { id: string } = await this.authService.validateApp(
      body.client_id,
      body.client_secret
    );
    if (!app) {
      throw new UnauthorizedException();
    }
    await this.authService.generateToken(app);
    return await this.authService.getAccessToken();
  }
}
