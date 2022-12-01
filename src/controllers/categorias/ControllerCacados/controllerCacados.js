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
const calcado_1 = __importDefault(require("../../../models/categorias/Calcados/calcado"));
const Imagem = require("../../../models/ModeLimagem/imagem.js");
const api_1 = __importDefault(require("../../../config/api/api"));
class calcadoController {
}
_a = calcadoController;
calcadoController.listarcalcado = (req, res) => {
    calcado_1.default.find()
        .populate('fornecedor')
        .populate('imagemProduto')
        .exec((err, calcados) => {
        res.status(200).json(calcados);
    });
};
calcadoController.cadastrarcalcado = (req, res) => {
    let calcados = new calcado_1.default(req.body);
    calcados.save((err) => {
        if (err) {
            res.status(500).send(({ message: `${err.message} - falha ao cadastrar o calcado` }));
        }
        else {
            res.status(200).send(calcados.toJSON());
        }
        ;
    });
};
calcadoController.atualizarcalcado = (req, res) => {
    const id = req.params.id;
    calcado_1.default.findByIdAndUpdate(id, { $set: req.body }, (err) => {
        if (!err) {
            res.status(200).send({ message: 'calcado atualizado com sucesso' });
        }
        else {
            res.status(500).send({ message: `Erro ao cadastrar o calcado - ${err.message}` });
        }
        ;
    });
};
calcadoController.listarcalcadoId = (req, res) => {
    const id = req.params.id;
    calcado_1.default.findById(id)
        .populate('fornecedor')
        .populate('imagemProduto')
        .exec((err, calcados) => {
        if (err) {
            res.status(400).send({ menssage: `${err.message} - id do calcado não encotrado` });
        }
        else {
            res.status(200).send(calcados);
        }
    });
};
calcadoController.excluirCalcadoEimagem = (req, res) => {
    const id = req.params.id;
    let url = process.env.APP_URL + "/listar-calcado/" + id;
    console.log(url);
    var XMLHttpRequest = require('xhr2');
    let req1 = new XMLHttpRequest();
    req1.open("GET", url);
    req1.send();
    api_1.default.request({
        method: "GET",
        url: `${process.env.APP_URL}/listar-calcado/${id}/`
    }).then(reposta => {
        if (reposta.status === 200) {
            if (reposta.data.imagemProduto === null) {
                calcado_1.default.findByIdAndDelete(id, (err) => {
                    if (!err) {
                        res.status(200).send({ message: 'calcado  deletado com sucesso1' });
                    }
                    else {
                        res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
                    }
                });
            }
            else {
                calcado_1.default.findById(id, (err) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!err) {
                        reposta.data.imagemProduto.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                            const imagem = yield Imagem.findById(item._id);
                            yield imagem.remove();
                        }));
                        const calcadoDelete = yield calcado_1.default.findById(id);
                        calcadoDelete === null || calcadoDelete === void 0 ? void 0 : calcadoDelete.remove();
                        res.status(200).send({ message: 'calcado deletado com sucesso-' });
                    }
                    else {
                        res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
                    }
                }));
            }
        }
    });
};
calcadoController.ExcluirCalcado = (req, res) => {
    const id = req.params.id;
    calcado_1.default.findByIdAndDelete(id, (err) => {
        if (!err) {
            res.status(200).send({ message: 'calcado  deletado com sucesso1' });
        }
        else {
            res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
        }
    });
};
exports.default = calcadoController;
