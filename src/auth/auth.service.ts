import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { UserService } from '../users/user.service';
import * as bcrypt from "bcrypt";
import * as crypto from "crypto"
@Injectable()
export class AuthService {
    constructor(
        // private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }
    async validateApp(clientID: string, clientSecret: string) {
        if (clientID != String(process.env.clientID) || clientSecret != String(process.env.clientSecret)) {
            return null
        } else {
            const id = `${new Date().getUTCDate()}-${process.env.clientID}-${process.env.clientSecret}`;
            const hash = id.split("").reduce((hex, c) => hex += c.charCodeAt(0).toString(16).padStart(2, "0"), "");
            return {
                id: hash
            }
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
    async validateUserById(userId: string) {
        const id = `${new Date().getUTCDate()}-${process.env.clientID}-${process.env.clientSecret}`
        const hash = id.split("").reduce((hex, c) => hex += c.charCodeAt(0).toString(16).padStart(2, "0"), "")
        if (hash == userId) return true;
        else return false;
    }

    async generateToken(user: any) {
        const payload = { sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}