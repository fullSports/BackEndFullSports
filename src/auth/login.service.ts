import { Model } from 'mongoose';
import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Login } from './schema/login.shema';
import bcrypt from 'bcrypt'
@Injectable()
export class LoginService {
    constructor(@InjectModel(Login.name) private readonly loginModel: Model<Login>) { }
    async ListLogins(): Promise<Login[]> {
        return this.loginModel.find().exec();
    }

    async RegisterLogin(createLogin: Login): Promise<Login> {
        const { email, password, isAdmin } = createLogin;
        const usuarioExiste = await this.loginModel.findOne({ email })
        if (!usuarioExiste) {
            bcrypt.hash(password, 10)
                .then(async hash => {
                    let encryptedPassowrd = hash

                    let newLogin = await this.loginModel.create({
                        email: email,
                        password: encryptedPassowrd,
                        isAdmin: isAdmin
                    });
                    return {
                        usuario: newLogin,
                        messagem: 'login cadastrado'
                    };
                });
        } else {
            return null;
        };
    };
    async listLoginById(id: string): Promise<Login> {
        const searchId = await this.loginModel.findById({ _id: id }).exec();
        return searchId;
    }

    async updateLogin(id: string, updateLoginBody: Login): Promise<Login> {
        return
    }
}