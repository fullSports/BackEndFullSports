import { Model } from "mongoose";
import { Body, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Users, UsersDocument } from "./Schema/user.schema";
import { RealizarLogin } from "./dto/SingIn.dto";
import { UpdateUserDTO } from "./dto/updateUser.dto";
const bcrypt = require("bcrypt");
@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<UsersDocument>
  ) {}
  async ListUsers(): Promise<Users[]> {
    return this.userModel.find().populate("imagemPerfil").exec();
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
          imagemPerfil: createUser.imagemPerfil,
          dataCadastro: dateNow,
        });
        return newUser;
      });
    } else {
      return null;
    }
  }

  async searchId(id: string): Promise<Users> {
    const searchId = await this.userModel
      .findById({ _id: id })
      .populate("imagemPerfil")
      .exec();
    return searchId;
  }

  async updateUser(id: string, updateUserBoy: UpdateUserDTO): Promise<Users> {
    // const updateUser = await this.userModel
    //   .findByIdAndUpdate(id, updateUserBoy)
    //   .setOptions({ overwrite: false, new: false });
    // if (!updateUser) {
    //   throw new NotFoundException();
    // }
    // return updateUser;
    const findByIDUser = await this.userModel.findById(id);
    Logger.debug(findByIDUser);
    const imagemPerfilBody = updateUserBoy.imagemPerfil;
    let ImgPerfil;
    if (!imagemPerfilBody) ImgPerfil = null;
    else ImgPerfil = imagemPerfilBody;
    const newUser = {
      cpf: updateUserBoy.cpf ? updateUserBoy.cpf : findByIDUser.cpf,
      nome: updateUserBoy.nome ? updateUserBoy.nome : findByIDUser.nome,
      login: {
        email: findByIDUser.login.email,
        password: findByIDUser.login.password,
        isAdmin: findByIDUser.login.isAdmin,
      },
      dataNascimento: updateUserBoy.dataNascimento
        ? updateUserBoy.dataNascimento
        : findByIDUser.dataNascimento,
      sexo: updateUserBoy.sexo ? updateUserBoy.sexo : findByIDUser.sexo,
      cep: updateUserBoy.cep ? updateUserBoy.cep : findByIDUser.cep,
      endereco: updateUserBoy.endereco
        ? updateUserBoy.endereco
        : findByIDUser.endereco,
      imagemPerfil: ImgPerfil,
    };
    Logger.warn(newUser);
    const updateUser = await this.userModel
      .findByIdAndUpdate(id, newUser)
      .setOptions({ overwrite: false, new: true });
    if (!updateUser) {
      throw new NotFoundException();
    }
    return updateUser;
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
