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
exports.roupaController = void 0;
const roupa_1 = require("../../../models/categorias/Roupa/roupa");
const Imagem = require("../../../models/imagem.js");
const api_1 = __importDefault(require("../../../config/api/api"));
class roupaController {
}
exports.roupaController = roupaController;
_a = roupaController;
roupaController.listarRoupas = (req, res) => {
    roupa_1.roupa.find()
        .populate('fornecedor')
        .populate('imagemProduto')
        .exec((err, roupas) => {
        res.status(200).json(roupas);
    });
};
roupaController.cadastrarRoupa = (req, res) => {
    let roupas = new roupa_1.roupa(req.body);
    roupas.save((err) => {
        if (err) {
            res.status(500).send(({ message: `${err.message} - falha ao cadastrar o roupa` }));
        }
        else {
            res.status(200).send(roupas.toJSON());
        }
        ;
    });
};
roupaController.atualizarRoupa = (req, res) => {
    const id = req.params.id;
    roupa_1.roupa.findByIdAndUpdate(id, { $set: req.body }, (err) => {
        if (!err) {
            res.status(200).send({ message: 'roupa atualizado com sucesso' });
        }
        else {
            res.status(500).send({ message: `Erro ao cadastrar o roupa - ${err.message}` });
        }
        ;
    });
};
roupaController.listarRoupaId = (req, res) => {
    const id = req.params.id;
    roupa_1.roupa.findById(id)
        .populate('fornecedor')
        .populate('imagemProduto')
        .exec((err, roupas) => {
        if (err) {
            res.status(400).send({ menssage: `${err.message} - id do roupa não encotrado` });
        }
        else {
            res.status(200).send(roupas);
        }
    });
};
roupaController.excluirRoupaEimagem = (req, res) => {
    const id = req.params.id;
    api_1.default.request({
        method: "GET",
        url: `${process.env.APP_URL}/listar-roupa/${id}`
    }).then(resposta => {
        if (resposta.status === 200) {
            if (resposta.data.imagemProduto === null) {
                roupa_1.roupa.findByIdAndDelete(id, (err) => {
                    if (!err) {
                        res.status(200).send({ message: 'roupa  deletado com sucesso1' });
                    }
                    else {
                        res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
                    }
                });
            }
            else {
                roupa_1.roupa.findById(id, (err) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!err) {
                        resposta.data.imagemProduto.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                            const imagem = yield Imagem.findById(item._id);
                            yield imagem.remove();
                        }));
                        const roupaDelete = yield roupa_1.roupa.findById(id);
                        roupaDelete === null || roupaDelete === void 0 ? void 0 : roupaDelete.remove();
                        res.status(200).send({ message: 'roupa deletado com sucesso-' });
                    }
                    else {
                        res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
                    }
                }));
            }
        }
    });
};
roupaController.excluirRoupa = (req, res) => {
    const id = req.params.id;
    roupa_1.roupa.findByIdAndDelete(id, (err) => {
        if (!err) {
            res.status(200).send({ message: 'roupa  deletado com sucesso1' });
        }
        else {
            res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
        }
    });
};
