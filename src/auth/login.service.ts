import { Model } from 'mongoose';
import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Login } from './schema/login.shema';

@Injectable()
export class LoginService {
    constructor(@InjectModel(Login.name) private readonly loginModel: Model<Login>) { }
    async ListLogin(): Promise<Login[]> {
        return this.loginModel.find().exec();
    }

    async RegisterLogin(createLogin: Login): Promise<Login> {
        try {
            const UsuarioExiste = ''
        } catch {

        }
        return
    }
}