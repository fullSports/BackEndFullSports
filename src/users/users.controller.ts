import { Body, Controller, Get, Param } from '@nestjs/common';
import { Delete, Post, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Users } from './Schema/user.schema';
import { UserService } from './user.service';
@Controller()
export class UserController {
    constructor(private userService: UserService) { }

    @Get('listar-clientes')
    async ListUsers(): Promise<Users[]> {
        return this.userService.ListUsers()
    };

    @Post('cadastrar-cliente')
    async CreateUser(@Body() createUser: Users) {
        const createdUser = await this.userService.RegisterUsers(createUser)
        return {
            usuario: createdUser,
            messagem: 'usuario cadastrado com sucesso'
        };
    };

    @Get('listar-cliente/:id')
    async SearchUserById(@Param('id') id: string): Promise<Users> {
        return this.userService.searchId(id);
    };

    @Put('atualizar-cliente/:id')
    async UpdateUserById(@Param('id') id: string, @Body() updateUser: Users) {
        const updateUserId = await this.userService.updateUser(id, updateUser);
        return {
            usuario: updateUserId,
            messagem: 'usuario atualizado com sucesso'
        };
    };

    @Delete('deletar-cliente/:id')
    async DeleteUserById(@Param('id') id: string) {
        await this.userService.deleteUser(id);
        return {
            messagem: "usuario deletado com sucesso"
        };
    };
};