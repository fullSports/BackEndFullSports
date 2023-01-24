import { Body, Controller, Get, Param } from "@nestjs/common";
import {
  Delete,
  Post,
  Put,
} from "@nestjs/common/decorators/http/request-mapping.decorator";
import { RealizarLogin } from "./dto/SingIn.dto";
import { UpdatePasswordUser } from "./dto/updateLogin.dtp";
import { UpdateUserDTO } from "./dto/updateUser.dto";
import { Users } from "./Schema/user.schema";
import { UserService } from "./user.service";
@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get("listar-clientes")
  async ListUsers(): Promise<Users[]> {
    return this.userService.ListUsers();
  }

  @Post("cadastrar-cliente")
  async CreateUser(@Body() createUser: Users) {
    const createdUser = await this.userService.RegisterUsers(createUser);
    if (!createdUser) {
      return {
        messagem: "email de usuario já cadastrado",
        registeredSuccess: false,
      };
    } else {
      return {
        user: createdUser,
        messagem: "usuario cadastrado com sucesso",
        registeredSuccess: true,
      };
    }
  }

  @Get("listar-cliente/:id")
  async SearchUserById(@Param("id") id: string): Promise<Users> {
    return this.userService.searchId(id);
  }

  @Put("atualizar-cliente/:id")
  async UpdateUserById(
    @Param("id") id: string,
    @Body() updateUser: UpdateUserDTO
  ) {
    const updateUserId = await this.userService.updateUser(id, updateUser);
    return {
      user: updateUserId,
      messagem: "usuario atualizado com sucesso",
    };
  }

  @Delete("deletar-cliente/:id")
  async DeleteUserById(
    @Param("id") id: string,
    @Body() singInBody: RealizarLogin
  ) {
    const deleteUser = await this.userService.deleteUser(id, singInBody);
    return deleteUser
    
  }

  @Post("realizar-login")
  async SingIn(@Body() singInBody: RealizarLogin) {
    const SingIn = await this.userService.signIn(singInBody);
    return SingIn;
  }

  @Put("atualizar-login/:id")
  async UpdatePassowdLogin(
    @Param("id") id: string,
    @Body() UpdatePasswordBody: UpdatePasswordUser
  ) {
    const updatePassword = await this.userService.updatePassworUser(
      id,
      UpdatePasswordBody
    );
    return {
      messagem: "login atualizado com suceeso",
      user: updatePassword,
    };
  }
}
