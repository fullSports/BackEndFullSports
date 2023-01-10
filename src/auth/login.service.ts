import { Model } from "mongoose";
import { Body, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Login } from "./schema/login.shema";
const bcrypt = require("bcrypt");
@Injectable()
export class LoginService {
  constructor(
    @InjectModel(Login.name) private readonly loginModel: Model<Login>
  ) {}
  async ListLogins(): Promise<Login[]> {
    return this.loginModel.find().exec();
  }

  async RegisterLogin(createLogin: Login): Promise<Login> {
    const { email, password, isAdmin } = createLogin;
    const usuarioExiste = await this.loginModel.findOne({ email });
    if (!usuarioExiste) {
      return bcrypt.hash(password, 10).then((hash) => {
        let encryptedPassowrd = hash;
        const newLogin = this.loginModel.create({
          email: email,
          password: encryptedPassowrd,
          isAdmin: isAdmin,
        });
        return newLogin;
      });
    } else {
      return null;
    }
  }
  async listLoginById(id: string): Promise<Login> {
    const searchId = await this.loginModel.findById({ _id: id }).exec();
    return searchId;
  }

  async updateLogin(id: string, updateLoginBody: Login): Promise<Login> {
    const updateLogin = await this.loginModel.findByIdAndUpdate(id, {
      $set: updateLoginBody,
    });
    return updateLogin;
  }

  async deleteLogin(id: string) {
    const deleteLogin = await this.loginModel
      .findByIdAndDelete({ _id: id })
      .exec();
    return {
      messagem: "Login deletado com sucesso",
    };
  }

  async signIn(realizarLogin: Login) {
    const { email, password } = realizarLogin;
    const userTrue = await this.loginModel.findOne({ email });
    if (!userTrue) return { messagem: "email não encontrado" };
    else {
      const comparePassword = await bcrypt.compareSync(
        password,
        userTrue.password
      );
      if (comparePassword) return { result: userTrue };
      else return { messagem: "senha incorreta" };
    }
  }
}
