import { Model } from "mongoose";
import { Body, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Users, UsersDocument } from "./Schema/user.schema";
import { Login, LoginDocument } from "./Schema/login.shema";
import { RealizarLogin } from "./dto/SingIn.dto";
import { UpdateUserDTO } from "./dto/updateUser.dto";
const bcrypt = require("bcrypt");
@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<UsersDocument>,
    @InjectModel(Login.name) private readonly loginModel: Model<LoginDocument>
  ) {}
  async ListUsers(): Promise<Users[]> {
    return this.userModel.find().exec();
  }

  async RegisterUsers(createUser: Users): Promise<Users> {
    const { email, password, isAdmin } = createUser.login;
    const usuarioExiste = await this.userModel.findOne({ email });
    if (!usuarioExiste) {
      return bcrypt.hash(password, 10).then((hash) => {
        let encryptedPassowrd = hash;
        const dateNow = new Date().toISOString();
        const newUser = this.userModel.create({
          cpf: createUser.cpf,
          nome: createUser.nome,
          login: {
            email: email,
            password: encryptedPassowrd,
            isAdmin: isAdmin,
          },
          dataNascimento: createUser.dataNascimento,
          sexo: createUser.sexo,
          cep: createUser.cep,
          endereco: createUser.endereco,
          dataCadastro: dateNow,
        });
        return newUser;
      });
    } else {
      return null;
    }
  }

  async searchId(id: string): Promise<Users> {
    const searchId = await this.userModel.findById({ _id: id }).exec();
    return searchId;
  }

  async updateUser(id: string, updateUserBoy: UpdateUserDTO): Promise<Users> {
    const c
    const BodyUpedateUser ={
      cpf: updateUserBoy.cep? updateUserBoy.cep : undefined,
      enderec: 
    } 
    const updateUserId = await this.userModel.findByIdAndUpdate(id, {
      $set: ,
    });
    return updateUserId;
  }

  async deleteUser(id: string, realizarLogin: RealizarLogin): Promise<Users> {
    const { email, password } = realizarLogin;
    const userTrue = await this.userModel.findOne({ email });
    if (!userTrue) return null;
    else {
      const comparePassword = await bcrypt.compareSync(
        password,
        userTrue.login.password
      );
      if (comparePassword)
        return await this.userModel.findByIdAndRemove({ _id: id }).exec();
      else return null;
    }
  }
  async signIn(realizarLogin: RealizarLogin) {
    const { email, password } = realizarLogin;
    const userTrue = await this.userModel.findOne({ email });
    if (!userTrue) return { messagem: "email não encontrado" };
    else {
      const comparePassword = await bcrypt.compareSync(
        password,
        userTrue.login.password
      );
      if (comparePassword) return { result: userTrue };
      else return { messagem: "senha incorreta" };
    }
  }
}
