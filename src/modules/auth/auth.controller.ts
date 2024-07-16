import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiExcludeEndpoint } from "@nestjs/swagger";
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("login-app")
  @ApiExcludeEndpoint()
  async LoginApp(@Body() body: { client_id: string; client_secret: string }) {
    const app = await this.authService.validateApp(
      body.client_id,
      body.client_secret
    );
    if (!app) {
      throw new UnauthorizedException();
    }
    const token = await this.authService.generateToken(app);
    this.authService.setAccessToken(token.access_token);
    return token;
  }
}
