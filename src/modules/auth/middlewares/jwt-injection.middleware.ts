import { Injectable, NestMiddleware } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtInjectionMiddleware implements NestMiddleware {
  constructor(private readonly AuthService: AuthService) {}
  async use(req: any, res: any, next: () => void) {
    if (!req.headers.authorization) {
      const token = await this.AuthService.getAccessToken();
      req.headers.authorization = `Bearer ${token?.access_token}`;
    }
    next();
  }
}
