import {
  Body,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Param,
  UseGuards,
} from "@nestjs/common";
import {
  Delete,
  Post,
  Put,
} from "@nestjs/common/decorators/http/request-mapping.decorator";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RealizarLogin } from "./dto/SingIn.dto";
import { UpdatePasswordUser } from "./dto/updateLogin.dtp";
import { UpdateUserDTO } from "./dto/updateUser.dto";
import { Users } from "./Schema/user.schema";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";
import { Cache } from "cache-manager";
import { RequestsEnum } from "src/queues/enum/request.enum";
import { QueueCacheService } from "src/queues/jobs/queue.cache.service";
@Controller()
@ApiTags("Users")
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly queueCacheService: QueueCacheService
  ) {}
  @UseGuards(AuthGuard("jwt"))
  @Get("listar-clientes")
  @ApiOperation({ summary: "list all users" })
  async ListUsers(): Promise<Users[]> {
    const users_cache = await this.cache.get(RequestsEnum.users);
    if (users_cache) {
      return users_cache;
    } else {
      const users = await this.userService.ListUsers();
      await this.cache.set(RequestsEnum.users, users);
      return users;
    }
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
      this.queueCacheService.addItem(RequestsEnum.users);
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
    this.queueCacheService.addItem(RequestsEnum.users);
    this.queueCacheService.addItem(`${RequestsEnum.users}-${id}`);
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
    this.queueCacheService.addItem(RequestsEnum.users);
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
    this.queueCacheService.addItem(RequestsEnum.users);
    this.queueCacheService.addItem(`${RequestsEnum.users}-${id}`);
    return {
      messagem: "login atualizado com suceeso",
      user: updatePassword,
    };
  }
}
