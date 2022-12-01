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
const api_1 = __importDefault(require("../../config/api/api"));
const cliente_1 = __importDefault(require("../../models/ModelCliente/cliente"));
const Imagem = require("../../models/ModeLimagem/imagem.js");
const login_1 = __importDefault(require("../../models/ModelLogin/login"));
require('dotenv').config();
class clienteController {
}
_a = clienteController;
clienteController.listarClientes = (req, res) => {
    cliente_1.default.find()
        .populate("imagemPerfil")
        .populate("login")
        .exec((err, cliente) => {
        res.status(200).json(cliente);
    });
};
clienteController.cadastrarCliente = (req, res) => {
    let clientes = new cliente_1.default(req.body);
    clientes.save((err) => {
        if (err) {
            res.status(500).send(({ message: `${err.message} - falha ao cadastrar o cliente` }));
        }
        else {
            res.status(200).send(clientes.toJSON());
        }
        ;
    });
};
clienteController.atualizarCliente = (req, res) => {
    const id = req.params.id;
    cliente_1.default.findByIdAndUpdate(id, { $set: req.body }, (err) => {
        if (!err) {
            res.status(200).send({ message: 'cliente atualizado com sucesso' });
        }
        else {
            res.status(500).send({ message: `Erro ao cadastrar o cliente - ${err.message}` });
        }
        ;
    });
};
clienteController.listarClienteId = (req, res) => {
    const id = req.params.id;
    cliente_1.default.findById(id)
        .populate("imagemPerfil")
        .populate("login")
        .exec((err, clientes) => {
        if (err) {
            res.status(400).send({ menssage: `${err.message} - id do cliente não encotrado` });
        }
        else {
            res.status(200).send(clientes);
        }
    });
};
clienteController.excluirCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    api_1.default.request({
        method: "GET",
        url: `listar-cliente/${id}`,
    }).then((resposta) => __awaiter(void 0, void 0, void 0, function* () {
        if (resposta.data.imagemPerfil == null || resposta.data.imagemPerfil == undefined) {
            const login = yield login_1.default.findById(resposta.data.login._id);
            yield (login === null || login === void 0 ? void 0 : login.remove());
            cliente_1.default.findByIdAndDelete(id, (err) => {
                if (!err) {
                    res.status(200).send({ message: 'cliente deletado com sucesso' });
                }
                else {
                    res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
                }
            });
        }
        else {
            console.log(resposta.data.imagemPerfil._id);
            const imagem = yield Imagem.findById(resposta.data.imagemPerfil._id);
            yield imagem.remove();
            const login = yield login_1.default.findById(resposta.data.login._id);
            yield (login === null || login === void 0 ? void 0 : login.remove());
            const clienteId = yield cliente_1.default.findById(id);
            yield (clienteId === null || clienteId === void 0 ? void 0 : clienteId.remove());
            console.log(resposta.data.imagemPerfil._id);
            return res.status(200).send({ message: 'cliente deletado com sucesso' });
        }
    })).catch((err) => {
        console.log(err);
        res.status(500).send({ message: `${err.message} - erro ao deletar o cliente` });
    });
});
exports.default = clienteController;
