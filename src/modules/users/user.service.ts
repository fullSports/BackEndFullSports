import { Model, Types } from "mongoose";
import {
  Injectable,
  Logger,
  NotFoundException,
  UseGuards,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Users, UsersDocument } from "./Schema/user.schema";
import { RealizarLogin } from "./dto/SingIn.dto";
import { UpdateUserDTO } from "./dto/updateUser.dto";
import { UpdatePasswordUser } from "./dto/updateLogin.dtp";
import { ImageDocument, imagem } from "../image/Schema/image.schema";
import { RecommendationService } from "@componentRecommendation/recommendation.service";
import { AuthGuard } from "@nestjs/passport";
import * as bcrypt from "bcrypt";
@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<UsersDocument>,
    @InjectModel(imagem.name) private readonly imageModel: Model<ImageDocument>,
    private readonly recommendationService: RecommendationService
  ) {}
  private Logger: Logger = new Logger(UserService.name);
  @UseGuards(AuthGuard("jwt"))
  async ListUsers(): Promise<Users[]> {
    const listUser = await this.userModel
      .find()
      .populate("imagemPerfil")
      .exec();
    if (!listUser) {
      throw new NotFoundException("Erro ao procurar usuários");
    }
    return listUser;
  }
  @UseGuards(AuthGuard("jwt"))
  async RegisterUsers(createUser: Users): Promise<Users> {
    const { email, password, isAdmin } = createUser.login;
    const listUser = await this.ListUsers();

    const userExists = listUser.some((user) => user.login.email === email);

    if (userExists) {
      return null;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const dateNow = new Date().toISOString();
      const newUser = await this.userModel.create({
        cpf: createUser.cpf,
        nome: createUser.nome,
        login: {
          email: email,
          password: hashedPassword,
          isAdmin: isAdmin,
        },
        dataNascimento: createUser.dataNascimento,
        sexo: createUser.sexo,
        cep: createUser.cep,
        endereco: createUser.endereco,
        imagemPerfil: createUser.imagemPerfil,
        dataCadastro: dateNow,
      });

      if (!newUser) {
        throw new NotFoundException();
      }
      const userId = newUser._id.toString();
      await this.recommendationService.RegisterRecommedations({
        click_calcados: 1,
        click_equipamentos: 1,
        click_roupas: 1,
        click_suplementos: 1,
        user: userId,
      });
      return newUser;
    } catch (error) {
      throw new Error("Falha ao registrar usuário");
    }
  }
  @UseGuards(AuthGuard("jwt"))
  async searchId(id: string): Promise<Users> {
    const searchId = await this.userModel
      .findById({ _id: id })
      .populate("imagemPerfil")
      .exec();
    if (!searchId) {
      throw new NotFoundException();
    }
    return searchId;
  }
  @UseGuards(AuthGuard("jwt"))
  async updateUser(id: string, updateUserDTO: UpdateUserDTO): Promise<Users> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException();
    }
    const updatedUser = {
      cpf: updateUserDTO.cpf || user.cpf,
      nome: updateUserDTO.nome || user.nome,
      login: {
        email: user.login.email,
        password: user.login.password,
        isAdmin: user.login.isAdmin,
      },
      dataNascimento: updateUserDTO.dataNascimento || user.dataNascimento,
      sexo: updateUserDTO.sexo || user.sexo,
      cep: updateUserDTO.cep || user.cep,
      endereco: updateUserDTO.endereco || user.endereco,
      imagemPerfil: updateUserDTO.imagemPerfil || null,
      dataCadastro: user.dataCadastro,
    };
    const updatedUserRecord = await this.userModel.findByIdAndUpdate(
      id,
      updatedUser,
      { overwrite: false, new: true }
    );
    if (!updatedUserRecord) {
      throw new NotFoundException();
    }
    return updatedUserRecord;
  }

  @UseGuards(AuthGuard("jwt"))
  async deleteUser(
    id: string,
    realizarLogin: RealizarLogin
  ): Promise<{ message: string }> {
    const { email, password } = realizarLogin;

    const user = await this.userModel.findById(id).exec();
    if (!user || user.login.email !== email) {
      return { message: "email ou senha invalida" };
    }

    const isPasswordValid = bcrypt.compareSync(password, user.login.password);
    if (!isPasswordValid) {
      return { message: "email ou senha invalida" };
    }

    if (user.imagemPerfil) {
      await this.imageModel.findByIdAndDelete(
        new Types.ObjectId(String(user.imagemPerfil))
      );
    }

    const recommendations =
      await this.recommendationService.listRecommedations();
    for (const recommendation of recommendations) {
      const recommendationUserId: string = recommendation.user["_id"];
      if (recommendationUserId && recommendationUserId.toString() === id) {
        await this.recommendationService.DeleteRecommendation(
          recommendation["_id"]
        );
        break;
      }
    }

    const deleteUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deleteUser) {
      throw new NotFoundException("Erro ao excluir usuário");
    }

    return { message: "Usuário deletado com sucesso" };
  }

  @UseGuards(AuthGuard("jwt"))
  async signIn(realizarLogin: RealizarLogin) {
    const { email, password } = realizarLogin;
    const listUser = this.ListUsers();
    const userTrue = (await listUser).filter(function (item) {
      return item.login.email == email;
    });
    if (userTrue.length == 0)
      return {
        message: "email não encontrado",
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
          message: "email ou senha incorretos",
          emailExists: true,
          emailAndPassword: false,
        };
      }
    }
  }
  @UseGuards(AuthGuard("jwt"))
  async updatePassworUser(id: string, UpdatePasswordBody: UpdatePasswordUser) {
    const { email, OldPassword, newPassoWord } = UpdatePasswordBody;
    const listUser = this.ListUsers();

    const userTrue = (await listUser).filter(function (item) {
      return item.login.email == email;
    });
    if (userTrue.length == 0)
      return {
        message: "email ou senha incorretos",
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
          message: "email ou senha incorretos",
          emailAndPassword: false,
        };
    }
  }
}
