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
exports.equipamentoController = void 0;
const equipamento_1 = require("../../../models/categorias/Equipamento/equipamento");
const Imagem = require("../../../models/imagem.js");
const api_1 = __importDefault(require("../../../config/api/api"));
class equipamentoController {
}
exports.equipamentoController = equipamentoController;
_a = equipamentoController;
equipamentoController.listarequipamento = (req, res) => {
    equipamento_1.equipamento.find()
        .populate('fornecedor')
        .populate('imagemProduto')
        .exec((err, equipamentos) => {
        res.status(200).json(equipamentos);
    });
};
equipamentoController.cadastrarequipamento = (req, res) => {
    let equipamentos = new equipamento_1.equipamento(req.body);
    equipamentos.save((err) => {
        if (err) {
            res.status(500).send(({ message: `${err.message} - falha ao cadastrar o equipamento` }));
        }
        else {
            res.status(200).send(equipamentos.toJSON());
        }
        ;
    });
};
equipamentoController.atualizarequipamento = (req, res) => {
    const id = req.params.id;
    equipamento_1.equipamento.findByIdAndUpdate(id, { $set: req.body }, (err) => {
        if (!err) {
            res.status(200).send({ message: 'equipamento atualizado com sucesso' });
        }
        else {
            res.status(500).send({ message: `Erro ao cadastrar o equipamento - ${err.message}` });
        }
        ;
    });
};
equipamentoController.listarequipamentoId = (req, res) => {
    const id = req.params.id;
    equipamento_1.equipamento.findById(id)
        .populate('fornecedor')
        .populate('imagemProduto')
        .exec((err, equipamentos) => {
        if (err) {
            res.status(400).send({ menssage: `${err.message} - id do equipamento não encotrado` });
        }
        else {
            res.status(200).send(equipamentos);
        }
    });
};
equipamentoController.excluirEquipamentoEimagem = (req, res) => {
    const id = req.params.id;
    api_1.default.request({
        method: "GET",
        url: `${process.env.APP_URL}/listar-equipamento/${id}`
    }).then(resposta => {
        if (resposta.status === 200) {
            if (resposta.data.imagemProduto === null) {
                equipamento_1.equipamento.findByIdAndDelete(id, (err) => {
                    if (!err) {
                        res.status(200).send({ message: 'equipamento  deletado com sucesso1' });
                    }
                    else {
                        res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
                    }
                });
            }
            else {
                equipamento_1.equipamento.findById(id, (err) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!err) {
                        resposta.data.imagemProduto.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                            const imagem = yield Imagem.findById(item._id);
                            yield imagem.remove();
                        }));
                        const equipamentoDelete = yield equipamento_1.equipamento.findById(id);
                        equipamentoDelete === null || equipamentoDelete === void 0 ? void 0 : equipamentoDelete.remove();
                        res.status(200).send({ message: 'equipamento deletado com sucesso-' });
                    }
                    else {
                        res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
                    }
                }));
            }
        }
    });
};
equipamentoController.excluirEquipamento = (req, res) => {
    const id = req.params.id;
    equipamento_1.equipamento.findByIdAndDelete(id, (err) => {
        if (!err) {
            res.status(200).send({ message: 'equipamento  deletado com sucesso1' });
        }
        else {
            res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
        }
    });
};
