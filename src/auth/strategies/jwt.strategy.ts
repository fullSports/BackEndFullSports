import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConfig } from '../config/jwt.config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly authService: AuthService) {
        super({

            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

            secretOrKey: jwtConfig.secret,
        });  
    }
    async validate(payload: any) {

        const user = await this.authService.validateUserById(payload.sub);

        if (!user) {

            throw new UnauthorizedException();
        }

        return user;

    }
    }


