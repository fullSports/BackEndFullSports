import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    // private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}
  private access_token: {
    access_token: string;
  };
  private async setAccessToken(token: { access_token: string }) {
    this.access_token = token;
  }
  async getAccessToken() {
    return this.access_token;
  }
  async validateApp(clientId: string, clientSecret: string) {
    if (
      clientId != String(process.env.clientId) ||
      clientSecret != String(process.env.clientSecret)
    ) {
      return null;
    } else {
      const id = `${new Date().getUTCDate()}-${process.env.clientId}-${
        process.env.clientSecret
      }`;
      const hash = id
        .split("")
        .reduce(
          (hex: string, c) =>
            hex + c.charCodeAt(0).toString(16).padStart(2, "0"),
          ""
        );
      return {
        id: hash,
      };
    }
  }
  // async validateUser(email: string, password: string) {
  //     const user = await this.userService.signIn({
  //         email,
  //         password
  //     });
  //     console.log()
  //     if (user.result) {
  //         return user.result;
  //     }
  //     return null;
  // }
  async validateUserById(userId: string): Promise<boolean> {
    const id = `${new Date().getUTCDate()}-${process.env.clientId}-${
      process.env.clientSecret
    }`;
    const hash = id
      .split("")
      .reduce(
        (hex: string, c) => hex + c.charCodeAt(0).toString(16).padStart(2, "0"),
        ""
      );
    return hash == userId;
  }

  async generateToken(user: { id: string }): Promise<{ access_token: string }> {
    const payload = { sub: user.id };
    await this.setAccessToken({
      access_token: this.jwtService.sign(payload),
    });
    return await this.getAccessToken();
  }
}
