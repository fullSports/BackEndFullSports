import { Body, Controller, Get, Param, UseGuards } from "@nestjs/common";
import {
  Delete,
  Post,
  Put,
} from "@nestjs/common/decorators/http/request-mapping.decorator";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { RealizarLogin } from "./dto/SingIn.dto";
import { UpdatePasswordUser } from "./dto/updateLogin.dtp";
import { UpdateUserDTO } from "./dto/updateUser.dto";
import { Users } from "./Schema/user.schema";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";
@Controller()
@ApiTags("Users")
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(AuthGuard("jwt"))
  @Get("listar-clientes")
  @ApiOperation({ summary: "list all users" })
  async ListUsers(): Promise<Users[]> {
    return this.userService.ListUsers();
  }
  @UseGuards(AuthGuard("jwt"))
  @Post("cadastrar-cliente")
  @ApiOperation({ summary: "register a new user" })
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
  @UseGuards(AuthGuard("jwt"))
  @Get("listar-cliente/:id")
  @ApiOperation({ summary: "list user by id" })
  async SearchUserById(@Param("id") id: string): Promise<Users> {
    return this.userService.searchId(id);
  }
  @UseGuards(AuthGuard("jwt"))
  @Put("atualizar-cliente/:id")
  @ApiOperation({ summary: "update user by id" })
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
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "delete user with id" })
  @Delete("deletar-cliente/:id")
  async DeleteUserById(
    @Param("id") id: string,
    @Body() singInBody: RealizarLogin
  ) {
    const deleteUser = await this.userService.deleteUser(id, singInBody);
    if (deleteUser)
      return {
        messagem: "cliente deletado com sucesso ",
      };
  }
  @UseGuards(AuthGuard("jwt"))
  @Post("realizar-login")
  @ApiOperation({ summary: "login with password and email" })
  async SingIn(@Body() singInBody: RealizarLogin) {
    const SingIn = await this.userService.signIn(singInBody);
    return SingIn;
  }
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "update user login or password" })
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
