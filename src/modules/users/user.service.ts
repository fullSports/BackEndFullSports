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

  async ListUsers(): Promise<Users[]> {
    const listUser = await this.userModel
      .find()
      .populate("imagemPerfil")
      .exec();
    if (!listUser || listUser.length === 0) {
      throw new NotFoundException("Erro ao procurar usuários");
    }
    return listUser;
  }

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
  async signIn(realizarLogin: RealizarLogin) {
    const { email, password } = realizarLogin;

    const users = await this.ListUsers();
    const user = users.find((user) => user.login.email === email);

    if (!user) {
      return {
        message: "email não encontrado",
        emailExists: false,
        emailAndPassword: false,
      };
    }

    const isPasswordValid = bcrypt.compareSync(password, user.login.password);
    if (isPasswordValid) {
      return {
        result: user,
        emailExists: true,
        emailAndPassword: true,
      };
    }

    return {
      message: "email ou senha incorretos",
      emailExists: true,
      emailAndPassword: false,
    };
  }
  async updatePassworUser(id: string, updatePasswordBody: UpdatePasswordUser) {
    const { email, OldPassword, newPassoWord, newEmail, isAdmin } =
      updatePasswordBody;

    if (!Types.ObjectId.isValid(id)) {
      throw new Error("ID de usuário inválido");
    }

    const users = await this.ListUsers();

    const user = users.find((user) => user.login.email === email);
    if (!user) {
      return {
        message: "email ou senha incorretos",
        emailExists: false,
      };
    }
    const isPasswordValid = await bcrypt.compare(
      OldPassword,
      user.login.password
    );
    if (!isPasswordValid) {
      return {
        message: "email ou senha incorretos",
        emailAndPassword: false,
      };
    }

    const encryptedPassword = newPassoWord
      ? await bcrypt.hash(newPassoWord, 10)
      : user.login.password;

    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      {
        login: {
          email: newEmail || user.login.email,
          password: encryptedPassword,
          isAdmin: isAdmin !== undefined ? isAdmin : user.login.isAdmin,
        },
        cpf: user.cpf,
        nome: user.nome,
        dataNascimento: user.dataNascimento,
        sexo: user.sexo,
        cep: user.cep,
        endereco: user.endereco,
        imagemPerfil: user.imagemPerfil,
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("Erro ao atualizar email/senha do usuário");
    }

    return updatedUser;
  }
}
