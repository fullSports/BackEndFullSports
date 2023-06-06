import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RealizarLogin } from '../users/dto/SingIn.dto';

@Controller('auth')

export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('login-app')
    async LoginApp(@Body() loginDto: {
        clientID: string,
        clientSecret: string
    }) {
        const user = await this.authService.validateApp(loginDto.clientID, loginDto.clientSecret);
        if (!user) {

            throw new UnauthorizedException();
        }
        return this.authService.generateToken(user);

    }
}
