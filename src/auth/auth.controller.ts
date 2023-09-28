import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Logger,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("login-app")
  async LoginApp(@Body() body: { client_id: string; client_secret: string }) {
    const user = await this.authService.validateApp(
      body.client_id,
      body.client_secret
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    const token = await this.authService.generateToken(user);
    this.authService.setAccessToken(token.access_token);
    Logger.debug(token);
    return token;
  }
}
