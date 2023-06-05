import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RealizarLogin } from '../users/dto/SingIn.dto';

@Controller('auth')

export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('login')
    async login(@Body() loginDto: RealizarLogin) {

        const user = await this.authService.validateUser(loginDto.email, loginDto.password);

        if (!user) {

            throw new UnauthorizedException();

        }

        return this.authService.generateToken(user);

    }

}
