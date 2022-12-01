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
const suplemento_1 = __importDefault(require("../../../models/categorias/Suplemento/suplemento"));
const Imagem = require("../../../models/ModeLimagem/imagem.js");
const api_1 = __importDefault(require("../../../config/api/api"));
class suplementoController {
}
_a = suplementoController;
suplementoController.listarsuplementos = (req, res) => {
    suplemento_1.default.find()
        .populate('fornecedor')
        .populate('imagemProduto')
        .exec((err, suplementos) => {
        res.status(200).json(suplementos);
    });
};
suplementoController.cadastrarsuplemento = (req, res) => {
    let suplementos = new suplemento_1.default(req.body);
    suplementos.save((err) => {
        if (err) {
            res.status(500).send(({ message: `${err.message} - falha ao cadastrar o suplemento` }));
        }
        else {
            res.status(200).send(suplementos.toJSON());
        }
        ;
    });
};
suplementoController.atualizarsuplemento = (req, res) => {
    const id = req.params.id;
    suplemento_1.default.findByIdAndUpdate(id, { $set: req.body }, (err) => {
        if (!err) {
            res.status(200).send({ message: 'suplemento atualizado com sucesso' });
        }
        else {
            res.status(500).send({ message: `Erro ao cadastrar o suplemento - ${err.message}` });
        }
        ;
    });
};
suplementoController.listarsuplementoId = (req, res) => {
    const id = req.params.id;
    suplemento_1.default.findById(id)
        .populate('fornecedor')
        .populate('imagemProduto')
        .exec((err, suplementos) => {
        if (err) {
            res.status(400).send({ menssage: `${err.message} - id do suplemento não encotrado` });
        }
        else {
            res.status(200).send(suplementos);
        }
    });
};
suplementoController.excluirsuplementoEimagem = (req, res) => {
    const id = req.params.id;
    api_1.default.request({
        method: "GET",
        url: `${process.env.APP_URL}/listar-suplemento/${id}`
    }).then(resposta => {
        if (resposta.status === 200) {
            if (resposta.data.imagemProduto === null) {
                suplemento_1.default.findByIdAndDelete(id, (err) => {
                    if (!err) {
                        res.status(200).send({ message: 'suplemento  deletado com sucesso1' });
                    }
                    else {
                        res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
                    }
                });
            }
            else {
                suplemento_1.default.findById(id, (err) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!err) {
                        resposta.data.imagemProduto.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                            const imagem = yield Imagem.findById(item._id);
                            yield imagem.remove();
                        }));
                        const suplementoDelete = yield suplemento_1.default.findById(id);
                        suplementoDelete === null || suplementoDelete === void 0 ? void 0 : suplementoDelete.remove();
                        res.status(200).send({ message: 'suplemento deletado com sucesso-' });
                    }
                    else {
                        res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
                    }
                }));
            }
        }
    });
};
suplementoController.excluirsuplemento = (req, res) => {
    const id = req.params.id;
    suplemento_1.default.findByIdAndDelete(id, (err) => {
        if (!err) {
            res.status(200).send({ message: 'suplemento  deletado com sucesso1' });
        }
        else {
            res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
        }
    });
};
exports.default = suplementoController;
