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
exports.produtoController = void 0;
const produto_1 = require("../../models/ModelProduto/produto");
const api_1 = __importDefault(require("../../config/api/api"));
const { logger } = require("../../logger/index");
class produtoController {
}
exports.produtoController = produtoController;
_a = produtoController;
produtoController.listarProdutos = (req, res) => {
    produto_1.produto.find()
        .populate({
        path: 'categoriaProduto',
        populate: [
            {
                path: 'roupa',
                populate: [{
                        path: 'imagemProduto'
                    },
                    {
                        path: 'fornecedor'
                    }]
            },
            {
                path: 'calcado',
                populate: [{
                        path: 'imagemProduto'
                    },
                    {
                        path: 'fornecedor'
                    }]
            },
            {
                path: 'equipamento',
                populate: [{
                        path: 'imagemProduto'
                    },
                    {
                        path: 'fornecedor'
                    }]
            },
            {
                path: 'suplemento',
                populate: [{
                        path: 'imagemProduto'
                    },
                    {
                        path: 'fornecedor'
                    }]
            }, {
                path: 'imagemProduto'
            },
            {
                path: 'fornecedor'
            }
        ]
    })
        .exec((err, produtos) => {
        res.status(200).json(produtos);
    });
};
produtoController.cadastrarProduto = (req, res) => {
    let produtos = new produto_1.produto(req.body);
    produtos.save((err) => {
        if (err) {
            res.status(500).send(({ message: `${err.message} - falha ao cadastrar o produto` }));
        }
        else {
            res.status(200).send(produtos.toJSON());
        }
        ;
    });
};
produtoController.atualizarProduto = (req, res) => {
    const id = req.params.id;
    produto_1.produto.findByIdAndUpdate(id, { $set: req.body }, (err) => {
        if (!err) {
            res.status(200).send({ message: 'produto atualizado com sucesso' });
        }
        else {
            res.status(500).send({ message: `Erro ao atualizar o produto - ${err.message}` });
        }
        ;
    });
};
produtoController.listarProdutoId = (req, res) => {
    const id = req.params.id;
    produto_1.produto.findById(id)
        .populate({
        path: 'categoriaProduto',
        populate: [
            {
                path: 'roupa',
                populate: [{
                        path: 'imagemProduto'
                    },
                    {
                        path: 'fornecedor'
                    }]
            },
            {
                path: 'calcado',
                populate: [{
                        path: 'imagemProduto'
                    },
                    {
                        path: 'fornecedor'
                    }]
            },
            {
                path: 'equipamento',
                populate: [{
                        path: 'imagemProduto'
                    },
                    {
                        path: 'fornecedor'
                    }]
            },
            {
                path: 'suplemento',
                populate: [{
                        path: 'imagemProduto'
                    },
                    {
                        path: 'fornecedor'
                    }]
            }, {
                path: 'imagemProduto'
            },
            {
                path: 'fornecedor'
            }
        ]
    })
        .exec((err, produtos) => {
        if (err) {
            res.status(400).send({ menssage: `${err.message} - id do produto não encotrado` });
        }
        else {
            res.status(200).send(produtos);
        }
    });
};
produtoController.excluirProduto = (req, res) => {
    const id = req.params.id;
    api_1.default.request({
        method: "GET",
        url: `listar-produto/${id}`
    }).then((resposta) => __awaiter(void 0, void 0, void 0, function* () {
        const categoria = resposta.data.categoriaProduto;
        if (categoria) {
            if (categoria.roupa != undefined) {
                if (categoria.roupa) {
                    return api_1.default.delete(`deletar-roupa-e-imagem/${categoria.roupa._id}`)
                        .then((resposta) => __awaiter(void 0, void 0, void 0, function* () {
                        const produtoDelete = yield produto_1.produto.findById(id);
                        produtoDelete === null || produtoDelete === void 0 ? void 0 : produtoDelete.remove();
                        res.status(200).send({ message: 'produto deletado com sucesso-' });
                    })).catch((err) => {
                        api_1.default.delete(`deletar-roupa/${categoria.roupa._id}`).then(resposta => {
                            res.status(200).send({ message: 'produto deletado com sucesso-' });
                        }).catch((err) => {
                            res.status(500).send({ message: 'Erro ao deletar o prodtuo' });
                            logger.error(err);
                        });
                        res.status(500).send({ message: 'Erro ao deletar o prodtuo' });
                        logger.error(err);
                    });
                }
                else {
                    produto_1.produto.findByIdAndDelete(id, (err) => {
                        if (!err) {
                            res.status(200).send({ message: 'produto deletado com sucesso-' });
                        }
                        else {
                            res.status(500).send({ message: 'Erro ao deletar o prodtuo' });
                        }
                    });
                }
            }
            if (categoria.suplemento != undefined) {
                if (categoria.suplemento) {
                    return api_1.default.delete(`deletar-suplemento-e-imagem/${categoria.suplemento._id}`)
                        .then((resposta) => __awaiter(void 0, void 0, void 0, function* () {
                        const produtoDelete = yield produto_1.produto.findById(id);
                        produtoDelete === null || produtoDelete === void 0 ? void 0 : produtoDelete.remove();
                        res.status(200).send({ message: 'produto deletado com sucesso-' });
                    })).catch((err) => {
                        api_1.default.delete(`deletar-suplemento/${categoria.suplemento._id}`).then(reposta => {
                            res.status(200).send({ message: 'produto deletado com sucesso-' });
                        }).catch((err) => {
                            res.status(500).send({ message: 'Erro ao deletar o prodtuo' });
                            logger.error(err);
                        });
                        res.status(500).send({ message: 'Erro ao deletar o prodtuo' });
                        logger.error(err);
                    });
                }
                else {
                    produto_1.produto.findByIdAndDelete(id, (err) => {
                        if (!err) {
                            res.status(200).send({ message: 'produto deletado com sucesso-' });
                        }
                        else {
                            res.status(500).send({ message: 'Erro ao deletar o prodtuo' });
                        }
                    });
                }
            }
            if (categoria.equipamento != undefined) {
                if (categoria.equipamento) {
                    return api_1.default.delete(`deletar-equipamento-e-imagem/${categoria.equipamento._id}`)
                        .then((resposta) => __awaiter(void 0, void 0, void 0, function* () {
                        const produtoDelete = yield produto_1.produto.findById(id);
                        produtoDelete === null || produtoDelete === void 0 ? void 0 : produtoDelete.remove();
                        res.status(200).send({ message: 'produto deletado com sucesso-' });
                    })).catch((err) => {
                        api_1.default.delete(`deletar-equipamento/${categoria.equipamento._id}`).then(resposta => {
                            res.status(200).send({ message: 'produto deletado com sucesso-' });
                        }).catch((err) => {
                            res.status(500).send({ message: 'Erro ao deletar o prodtuo' });
                            logger.error(err);
                        });
                        res.status(500).send({ message: 'Erro ao deletar o prodtuo' });
                        logger.error(err);
                    });
                }
                else {
                    produto_1.produto.findByIdAndDelete(id, (err) => {
                        if (!err) {
                            res.status(200).send({ message: 'produto deletado com sucesso-' });
                        }
                        else {
                            res.status(500).send({ message: 'Erro ao deletar o prodtuo' });
                        }
                    });
                }
            }
            if (categoria.calcado != undefined) {
                if (categoria.calcado) {
                    return api_1.default.delete(`deletar-calcado-e-imagem/${categoria.calcado._id}`)
                        .then((resposta) => __awaiter(void 0, void 0, void 0, function* () {
                        const produtoDelete = yield produto_1.produto.findById(id);
                        produtoDelete === null || produtoDelete === void 0 ? void 0 : produtoDelete.remove();
                        res.status(200).send({ message: 'produto deletado com sucesso-' });
                    })).catch((err) => {
                        api_1.default.delete(`deletar-calcado/${categoria.calcado_id}`).then(resposta => {
                            res.status(200).send({ message: 'produto deletado com sucesso-' });
                        }).catch((err) => {
                            res.status(500).send({ message: 'Erro ao deletar o prodtuo' });
                            logger.error(err);
                        });
                        res.status(500).send({ message: 'Erro ao deletar o prodtuo' });
                        logger.error(err);
                    });
                }
                else {
                    produto_1.produto.findByIdAndDelete(id, (err) => {
                        if (!err) {
                            res.status(200).send({ message: 'produto deletado com sucesso-' });
                        }
                        else {
                            res.status(500).send({ message: 'Erro ao deletar o prodtuo' });
                        }
                    });
                }
            }
        }
        else {
            produto_1.produto.findByIdAndDelete(id, (err) => {
                if (!err) {
                    res.status(200).send({ message: 'produto deletado com sucesso-' });
                }
                else {
                    res.status(500).send({ message: 'Erro ao deletar o prodtuo' });
                }
            });
        }
    }));
};
