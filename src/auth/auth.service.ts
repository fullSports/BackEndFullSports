import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.userService.signIn({
            email,
            password
        });
        if (user.result) {
            return user.result;
        }
        return null;
    }
    async validateUserById(userId: string) {
        return this.userService.searchId(userId);
    }

    async generateToken(user: any) {
        const payload = { sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}