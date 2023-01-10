import { Body, Controller, Get, Param } from '@nestjs/common';
import { Delete, Post, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { LoginService } from './login.service';
import { Login } from './schema/login.shema';

@Controller()
export class LoginController {
    constructor(private loginService: LoginService) { }
    @Post('login')

    @Get('login')
    async ListLogins(): Promise<Login[]> {
        return this.loginService.ListLogins()
    }

}