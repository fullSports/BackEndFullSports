import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("login-app")
  async LoginApp(@Body() body: { clientId: string; clientSecret: string }) {
    const app = await this.authService.validateApp(
      body.clientId,
      body.clientSecret
    );
    if (!app) {
      throw new UnauthorizedException();
    }
    const token = await this.authService.generateToken(app);
    this.authService.setAccessToken(token.access_token);
    return token;
  }
}
