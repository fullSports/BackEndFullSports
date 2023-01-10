import { Body, Controller, Get, Param } from "@nestjs/common";
import {
  Delete,
  Post,
  Put,
} from "@nestjs/common/decorators/http/request-mapping.decorator";
import { LoginService } from "./login.service";
import { Login } from "./schema/login.shema";

@Controller()
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Get("login")
  async ListLogins(): Promise<Login[]> {
    return this.loginService.ListLogins();
  }

  @Post("login")
  async CreateLogin(@Body() createLogin: Login) {
    const newLogin = await this.loginService.RegisterLogin(createLogin);
    if (newLogin)
      return {
        usuario: newLogin,
        messagem: "usuario cadastrado com sucesso",
      };
    else
      return {
        menssagem: "email já cadastrado",
      };
  }

  @Get("login/:id")
  async ListLoginID(@Param("id") id: string): Promise<Login> {
    const listLoginById = await this.loginService.listLoginById(id);
    return listLoginById;
  }

  @Delete("login/:id")
  async DeleteLogin(@Param("id") id: string) {
    const deleteLogin = await this.loginService.deleteLogin(id);
    return deleteLogin;
  }

  @Post("realizar-login")
  async SingIn(@Body() singInBody: Login) {
    const SingIn = await this.loginService.signIn(singInBody);
    return SingIn;
  }
}
