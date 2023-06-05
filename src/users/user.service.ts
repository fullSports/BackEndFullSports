import { Model } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Users, UsersDocument } from "./Schema/user.schema";
import { RealizarLogin } from "./dto/SingIn.dto";
import { UpdateUserDTO } from "./dto/updateUser.dto";
import { UpdatePasswordUser } from "./dto/updateLogin.dtp";
import { ImageDocument, imagem } from "../image/Schema/image.schema";
import { RecommendationService } from "src/componentRecommendation /recommendation.service";
import * as bcrypt from "bcrypt";
@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<UsersDocument>,
    @InjectModel(imagem.name) private readonly imageModel: Model<ImageDocument>,
    private readonly recommendationService: RecommendationService
  ) {}
  async ListUsers(): Promise<Users[]> {
    const listUser = await this.userModel
      .find()
      .populate("imagemPerfil")
      .exec();
    if (!listUser) throw new NotFoundException();
    else return listUser;
  }

  async RegisterUsers(createUser: Users): Promise<Users> {
    const { email, password, isAdmin } = createUser.login;
    const listUser = this.ListUsers();

    const userTrue = (await listUser).filter(function (item) {
      return item.login.email == email;
    });

    if (userTrue.length === 0) {
      return bcrypt.hash(password, 10).then(async (hash) => {
        const encryptedPassowrd = hash;
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
        if (!newUser) throw new NotFoundException();
        else {
          const _id = await newUser.then((res) => res._id.toString());
          await this.recommendationService.RegisterRecommedations({
            click_calcados: 1,
            click_equipamentos: 1,
            click_roupas: 1,
            click_suplementos: 1,
            user: _id,
          });
          return newUser;
        }
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
    if (!searchId) throw new NotFoundException();
    else return searchId;
  }

  async updateUser(id: string, updateUserBoy: UpdateUserDTO): Promise<Users> {
    const findByIDUser = await this.userModel.findById(id);
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
      dataCadastro: findByIDUser.dataCadastro,
    };
    const updateUser = await this.userModel
      .findByIdAndUpdate(id, newUser)
      .setOptions({ overwrite: false, new: true });
    if (!updateUser) {
      throw new NotFoundException();
    }
    return updateUser;
  }

  async deleteUser(id: string, realizarLogin: RealizarLogin) {
    const { email, password } = realizarLogin;
    const userTrue = await this.userModel.findById({ _id: id }).exec();
    if (userTrue.login.email !== email)
      return {
        messgem: "email ou senha invalida",
      };
    else {
      const comparePassword = await bcrypt.compareSync(
        password,
        userTrue.login.password
      );
      if (comparePassword) {
        const searchId = await this.userModel.findById({ _id: id }).exec();
        if (!searchId) throw new NotFoundException();
        else {
          if (searchId.imagemPerfil) {
            const deleteImage = await this.imageModel.findByIdAndDelete({
              _id: searchId.imagemPerfil,
            });
            deleteImage;
          }
          const searchRecommedation =
            await this.recommendationService.listRecommedations();
          for (let i = 0; i < searchRecommedation.length; i++) {
            const user = searchRecommedation[i]["user"] as any;
            const _id = searchRecommedation[i]["_id"] as any;
            if (_id && user._id.toString() == searchId._id) {
              await this.recommendationService.DeleteRecommendation(
                _id.toString()
              );
              break;
            }
          }
          const deleteUser = await this.userModel
            .findByIdAndDelete({ _id: id })
            .exec();
          if (!deleteUser) throw new NotFoundException();
          else return deleteUser;
        }
      } else
        return {
          messgem: "email ou senha invalida",
        };
    }
  }

  async signIn(realizarLogin: RealizarLogin) {
    const { email, password } = realizarLogin;
    const listUser = this.ListUsers();
    const userTrue = (await listUser).filter(function (item) {
      return item.login.email == email;
    });
    if (userTrue.length == 0)
      return {
        messagem: "email não encontrado",
        emailExists: false,
        emailAndPassword: false,
      };
    else {
      const comparePassword = await bcrypt.compareSync(
        password,
        userTrue[0].login.password
      );
      if (comparePassword) {
        return {
          result: userTrue[0],
          emailExists: true,
          emailAndPassword: true,
        };
      } else {
        return {
          messagem: "email ou senha incorretos",
          emailExists: true,
          emailAndPassword: false,
        };
      }
    }
  }

  async updatePassworUser(id: string, UpdatePasswordBody: UpdatePasswordUser) {
    const { email, OldPassword, newPassoWord } = UpdatePasswordBody;
    const listUser = this.ListUsers();

    const userTrue = (await listUser).filter(function (item) {
      return item.login.email == email;
    });
    if (userTrue.length == 0)
      return {
        messagem: "email ou senha incorretos",
        emailExists: false,
      };
    else {
      const comparePassword = await bcrypt.compareSync(
        OldPassword,
        userTrue[0].login.password
      );
      if (comparePassword) {
        return bcrypt
          .hash(newPassoWord ? newPassoWord : "2", 10)
          .then(async (hash) => {
            const encryptedPassowrd = hash;
            const findByIDUser = await this.userModel.findById(id);
            const newUser = {
              cpf: findByIDUser.cpf,
              nome: findByIDUser.nome,
              login: {
                email: UpdatePasswordBody.newEmail
                  ? UpdatePasswordBody.newEmail
                  : findByIDUser.login.email,
                password: newPassoWord
                  ? encryptedPassowrd
                  : findByIDUser.login.password,
                isAdmin: UpdatePasswordBody.isAdmin
                  ? UpdatePasswordBody.isAdmin
                  : findByIDUser.login.isAdmin,
              },
              dataNascimento: findByIDUser.dataNascimento,
              sexo: findByIDUser.sexo,
              cep: findByIDUser.cep,
              endereco: findByIDUser.endereco,
              imagemPerfil: findByIDUser.imagemPerfil,
            };
            const updateUser = await this.userModel
              .findByIdAndUpdate(id, newUser)
              .setOptions({ overwrite: false, new: true });
            if (!updateUser) {
              throw new NotFoundException();
            }
            return updateUser;
          });
      } else
        return {
          messagem: "email ou senha incorretos",
          emailAndPassword: false,
        };
    }
  }
}
