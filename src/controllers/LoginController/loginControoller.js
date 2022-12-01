"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __importDefault(require("../../models/ModelLogin/login"));
const cliente_1 = __importDefault(require("../../models/ModelCliente/cliente"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const api_1 = __importDefault(require("../../config/api/api"));
const url = process.env.APP_URL;
class loginController {
}
_a = loginController;
loginController.cadastrarLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, isAdmin } = req.body;
    try {
        const usuarioExiste = yield login_1.default.findOne({ email });
        if (!usuarioExiste) {
            bcrypt_1.default.hash(password, 10)
                .then(hash => {
                let encryptedPassowrd = hash;
                let newLogin = new login_1.default({
                    email: email,
                    password: encryptedPassowrd,
                    isAdmin: isAdmin
                });
                newLogin.save((err) => {
                    if (err) {
                        res.status(500).send(({ message: `${err.message} - falha ao cadastrar o login` }));
                    }
                    else {
                        res.status(200).send(newLogin.toJSON());
                    }
                    ;
                });
            }).catch(err => res.status(500).json({ message: `erro ao cadastrar login- ${err}` }));
        }
        else {
            res.status(200).send(({ message: "email ja cadastrado" }));
        }
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao pesquisar email!" });
    }
});
loginController.listarLogin = (req, res) => {
    login_1.default.find((err, loginBody) => {
        try {
            res.status(200).json(loginBody);
        }
        catch (_b) {
            res.status(400).json(`erro ao listar login- ${err}`);
        }
    });
};
loginController.listarLoginID = (req, res) => {
    const id = req.params.id;
    login_1.default.findById(id, (err, loginBody) => {
        if (err) {
            res.status(400).send({ menssage: `${err.message} - id do fornecedor não encotrado` });
        }
        else {
            res.status(200).send(loginBody);
        }
    });
};
loginController.atualizarLogin = (req, res) => {
    const id = req.params.id;
    login_1.default.findByIdAndUpdate(id, { $set: req.body }, (err) => {
        if (err) {
            res.status(400).send({ menssage: `${err.message} - id do login não encontrado` });
        }
        else {
            res.status(200).send({ message: "login atualizado com sucesso" });
        }
    });
};
loginController.excluirLogin = (req, res) => {
    const id = req.params.id;
    login_1.default.findByIdAndDelete(id, (err) => {
        if (!err) {
            res.status(200).send({ message: `login deletado` });
        }
        else {
            res.status(500).send({ message: `${err.message} - erro ao deletar login` });
        }
    });
};
loginController.realizarLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const usuarioExiste = yield login_1.default.findOne({ email });
        if (!usuarioExiste) {
            return res.status(200).send({ message: "email não cadastrado" });
        }
        else {
            const comparaSenha = yield bcrypt_1.default.compareSync(password, usuarioExiste.password);
            if (comparaSenha) {
                return res.status(200).json({ result: usuarioExiste });
            }
            else {
                return res.status(200).send({ message: "senha incorreta" });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao Tentar Login!" });
    }
});
loginController.pesquisarEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const pesquisaEmail = yield login_1.default.findOne({ email });
        console.log(pesquisaEmail);
        if (!pesquisaEmail) {
            res.status(200).send({ emailExiste: false });
        }
        else {
            res.status(200).send({ emailExiste: true });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao pesquisar o e-mail!" });
    }
});
loginController.pesquisarEmail_RetornarCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const pesquisaLogin = yield login_1.default.findOne({ email });
        console.log(pesquisaLogin === null || pesquisaLogin === void 0 ? void 0 : pesquisaLogin._id.toString());
        const login = pesquisaLogin;
        console.log(login);
        const pesquisaCliente = yield cliente_1.default.findOne({ login });
        console.log(pesquisaCliente);
        const id = pesquisaCliente === null || pesquisaCliente === void 0 ? void 0 : pesquisaCliente._id.toString();
        api_1.default.get(`${url}/listar-cliente/${id}`).then(resposta => {
            console.log(resposta.data._id);
            res.status(200).json(resposta.data);
        }).catch((error) => {
            console.log(error);
            res.status(500).json({ message: "Erro ao pesquisar o e-mail!" });
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erro ao pesquisar o e-mail!" });
    }
});
exports.default = loginController;
