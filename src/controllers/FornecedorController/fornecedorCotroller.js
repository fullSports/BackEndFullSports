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
const fornecedor_1 = __importDefault(require("../../models/ModelFornecedor/fornecedor"));
class fornecedorController {
}
_a = fornecedorController;
fornecedorController.listarFornecedor = (req, res) => {
    fornecedor_1.default.find((err, fornecedor) => {
        res.status(200).json(fornecedor);
    });
};
fornecedorController.cadastrarFornecedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let fornecedors = new fornecedor_1.default(req.body);
    const { cnpj } = req.body;
    try {
        const fornecedorExiste = yield fornecedor_1.default.findOne({ cnpj });
        if (!fornecedorExiste) {
            fornecedors.save((err) => {
                if (err) {
                    res.status(500).send(({ message: `${err.message} - falha ao cadastrar o fornecedor` }));
                }
                else {
                    res.status(200).send(fornecedors.toJSON());
                }
                ;
            });
        }
        else {
            res.status(200).send(({ message: "cnpj ja cadastrado" }));
        }
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao pesquisar cnpj" });
    }
});
fornecedorController.atualizarfornecedor = (req, res) => {
    const id = req.params.id;
    fornecedor_1.default.findByIdAndUpdate(id, { $set: req.body }, (err) => {
        if (!err) {
            res.status(200).send({ message: 'fornecedor atualizado com sucesso' });
        }
        else {
            res.status(500).send({ message: `Erro ao cadastrar o fornecedor - ${err.message}` });
        }
        ;
    });
};
fornecedorController.listarFornecedorId = (req, res) => {
    const id = req.params.id;
    fornecedor_1.default.findById(id, (err, fornecedor) => {
        if (err) {
            res.status(400).send({ menssage: `${err.message} - id do fornecedor não encotrado` });
        }
        else {
            res.status(200).send(fornecedor);
        }
    });
};
fornecedorController.excluirFornecedor = (req, res) => {
    const id = req.params.id;
    fornecedor_1.default.findByIdAndDelete(id, (err) => {
        if (!err) {
            res.status(200).send({ message: 'fornecedor deletado com sucesso' });
        }
        else {
            res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
        }
    });
};
exports.default = fornecedorController;
