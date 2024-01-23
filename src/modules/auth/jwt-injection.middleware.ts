import { Injectable, NestMiddleware } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtInjectionMiddleware implements NestMiddleware {
  constructor(private readonly AuthService: AuthService) {}
  use(req: any, res: any, next: () => void) {
    // Verifique se já existe um token JWT na solicitação
    if (!req.headers.authorization) {
      // Se não houver token JWT, você pode injetá-lo aqui a partir de onde você o armazena (por exemplo, armazenamento local, cookie, etc.)
      // Substitua 'YOUR_TOKEN' pelo token JWT adequado
      req.headers.authorization = `Bearer ${this.AuthService.getAccessToken()}`;
    }
    next();
  }
}
