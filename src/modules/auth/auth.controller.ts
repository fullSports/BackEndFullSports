import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("login-app")
  async LoginApp(@Body() body: { clientId: string; clientSecret: string }) {
    const user = await this.authService.validateApp(
      body.clientId,
      body.clientSecret
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    const token = await this.authService.generateToken(user);
    this.authService.setAccessToken(token.access_token);
    return token;
  }
}
