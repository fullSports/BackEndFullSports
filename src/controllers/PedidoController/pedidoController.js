"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __importDefault(require("../../config/api/api"));
const pedido_1 = __importDefault(require("../../models/ModelPedidos/pedido"));
require('dotenv').config();
const url = process.env.APP_URL;
class pedidoController {
}
pedidoController.ListarPedido = (req, res) => {
    pedido_1.default.find()
        .populate({
        path: 'produto',
        populate: [
            {
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
            }
        ],
    }).populate('cliente')
        .exec((err, pedidoI) => {
        if (err) {
            res.status(500).send(({ message: "erro ao listar os pedidos" }));
        }
        else {
            res.status(200).json(pedidoI);
        }
    });
};
pedidoController.ListaPedidoId = (req, res) => {
    const id = req.params.id;
    pedido_1.default.findById(id).populate({
        path: 'produto',
        populate: [
            {
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
            }
        ]
    }).populate('cliente').exec((err, pedidoId) => {
        if (err) {
            res.status(500).send(({ message: "erro ao listar o pedido" }));
        }
        else {
            res.status(200).json(pedidoId);
        }
    });
};
pedidoController.RealizarPedido = (req, res) => {
    const { quantidadePedido, produto, cliente } = req.body;
    try {
        if (quantidadePedido < 1) {
            res.status(500).send({ message: "minimo de 1 para realizar o pedido" });
        }
        else
            api_1.default.get(`${url}/listar-produto/${produto}`)
                .then(resposta => {
                if (resposta.data.categoriaProduto.roupa !== undefined) {
                    const newQuantidade = resposta.data.categoriaProduto.roupa.quantidade - quantidadePedido;
                    var precoProduto = resposta.data.categoriaProduto.roupa.preco;
                    var newPrecoProduto = parseFloat(precoProduto.replace(',', '.'));
                    var totalPedio = quantidadePedido * newPrecoProduto;
                    if (newQuantidade <= 0) {
                        res.status(500).send({ message: "quantidade do produto maior que a disponivel" });
                    }
                    else {
                        api_1.default.put(`${url}/atualizar-roupa/${resposta.data.categoriaProduto.roupa._id}`, {
                            quantidade: newQuantidade
                        }).then(respoataCategoria => {
                            console.log(respoataCategoria.data);
                            let newPedido = new pedido_1.default({
                                quantidadePedido: quantidadePedido,
                                produto: produto,
                                cliente: cliente,
                                total: totalPedio,
                            });
                            newPedido.save((err) => {
                                if (err) {
                                    res.status(500).send(({ message: `falha ao cadastrar o pedido ${err.message}` }));
                                }
                                else {
                                    res.status(200).send({ message: "pedido cadastrado com sucesso" });
                                }
                            });
                        })
                            .catch((err) => console.log(err));
                    }
                }
                else if (resposta.data.categoriaProduto.equipamento !== undefined) {
                    const newQuantidade = resposta.data.categoriaProduto.equipamento.quantidade - quantidadePedido;
                    let precoProduto = resposta.data.categoriaProduto.equipamento.preco;
                    var newPrecoProduto = parseFloat(precoProduto.replace(',', '.'));
                    var totalPedio = quantidadePedido * newPrecoProduto;
                    if (newQuantidade <= 0) {
                        res.status(500).send({ message: "quantidade do produto maior que a disponivel" });
                    }
                    else {
                        api_1.default.put(`${url}/atualizar-equipamento/${resposta.data.categoriaProduto.equipamento._id}`, {
                            quantidade: newQuantidade
                        }).then(respoataCategoria => {
                            console.log(respoataCategoria.data);
                            let newPedido = new pedido_1.default({
                                quantidadePedido: quantidadePedido,
                                produto: produto,
                                cliente: cliente,
                                total: totalPedio,
                            });
                            newPedido.save((err) => {
                                if (err) {
                                    res.status(500).send(({ message: `falha ao cadastrar o pedido ${err.message}` }));
                                }
                                else {
                                    res.status(200).send({ message: "pedido cadastrado com sucesso" });
                                }
                            });
                        });
                    }
                }
                else if (resposta.data.categoriaProduto.suplemento !== undefined) {
                    const newQuantidade = resposta.data.categoriaProduto.suplemento.quantidade - quantidadePedido;
                    let precoProduto = resposta.data.categoriaProduto.suplemento.preco;
                    var newPrecoProduto = parseFloat(precoProduto.replace(',', '.'));
                    var totalPedio = quantidadePedido * newPrecoProduto;
                    if (newQuantidade <= 0) {
                        res.status(500).send({ message: "quantidade do produto maior que a disponivel" });
                    }
                    else {
                        api_1.default.put(`${url}/atualizar-suplemento/${resposta.data.categoriaProduto.suplemento._id}`, {
                            quantidade: newQuantidade
                        }).then(respoataCategoria => {
                            console.log(respoataCategoria.data);
                            let newPedido = new pedido_1.default({
                                quantidadePedido: quantidadePedido,
                                produto: produto,
                                cliente: cliente,
                                total: totalPedio,
                            });
                            newPedido.save((err) => {
                                if (err) {
                                    res.status(500).send(({ message: `falha ao cadastrar o pedido ${err.message}` }));
                                }
                                else {
                                    res.status(200).send({ message: "pedido cadastrado com sucesso" });
                                }
                            });
                        });
                    }
                }
                else if (resposta.data.categoriaProduto.calcado !== undefined) {
                    const newQuantidade = resposta.data.categoriaProduto.calcado.quantidade - quantidadePedido;
                    let precoProduto = resposta.data.categoriaProduto.calcado.preco;
                    var newPrecoProduto = parseFloat(precoProduto.replace(',', '.'));
                    var totalPedio = quantidadePedido * newPrecoProduto;
                    if (newQuantidade <= 0) {
                        res.status(500).send({ message: "quantidade do produto maior que a disponivel" });
                    }
                    else {
                        api_1.default.put(`${url}/atualizar-calcado/${resposta.data.categoriaProduto.calcado._id}`, {
                            quantidade: newQuantidade
                        }).then(respoataCategoria => {
                            console.log(respoataCategoria.data);
                            let newPedido = new pedido_1.default({
                                quantidadePedido: quantidadePedido,
                                produto: produto,
                                cliente: cliente,
                                total: totalPedio,
                            });
                            newPedido.save((err) => {
                                if (err) {
                                    res.status(500).send(({ message: `falha ao cadastrar o pedido ${err.message}` }));
                                }
                                else {
                                    res.status(200).send({ message: "pedido cadastrado com sucesso" });
                                }
                            });
                        });
                    }
                }
            }).catch((err) => console.log(err));
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Erro na requisição" });
    }
};
pedidoController.CancelarPedido = (req, res) => {
    const id = req.params.id;
    try {
        api_1.default.get(`${url}/listar-pedido/${id}`)
            .then(respostaPedido => {
            api_1.default.get(`${url}/listar-produto/${respostaPedido.data.produto._id}`)
                .then(respostaProduto => {
                if (respostaProduto.data.categoriaProduto.roupa !== undefined) {
                    const newQuantidade = respostaPedido.data.quantidadePedido + respostaProduto.data.categoriaProduto.roupa.quantidade;
                    console.log(newQuantidade);
                    api_1.default.put(`${url}/atualizar-roupa/${respostaProduto.data.categoriaProduto.roupa._id}`, {
                        quantidade: newQuantidade
                    }).then(() => {
                        pedido_1.default.findByIdAndDelete(id, (err) => {
                            if (!err) {
                                res.status(200).send({ message: `pedudo deletado` });
                            }
                            else {
                                res.status(500).send({ message: `${err.message} - erro ao deletar pedido` });
                            }
                        });
                    });
                }
                else if (respostaProduto.data.categoriaProduto.equipamento !== undefined) {
                    const newQuantidade = respostaPedido.data.quantidadePedido + respostaProduto.data.categoriaProduto.equipamento.quantidade;
                    console.log(newQuantidade);
                    api_1.default.put(`${url}/atualizar-equipamento/${respostaProduto.data.categoriaProduto.equipamento._id}`, {
                        quantidade: newQuantidade
                    }).then(() => {
                        pedido_1.default.findByIdAndDelete(id, (err) => {
                            if (!err) {
                                res.status(200).send({ message: `pedudo deletado` });
                            }
                            else {
                                res.status(500).send({ message: `${err.message} - erro ao deletar pedido` });
                            }
                        });
                    });
                }
                else if (respostaProduto.data.categoriaProduto.suplemento !== undefined) {
                    const newQuantidade = respostaPedido.data.quantidadePedido + respostaProduto.data.categoriaProduto.suplemento.quantidade;
                    console.log(newQuantidade);
                    api_1.default.put(`${url}/atualizar-suplemento/${respostaProduto.data.categoriaProduto.suplemento._id}`, {
                        quantidade: newQuantidade
                    }).then(() => {
                        pedido_1.default.findByIdAndDelete(id, (err) => {
                            if (!err) {
                                res.status(200).send({ message: `pedudo deletado` });
                            }
                            else {
                                res.status(500).send({ message: `${err.message} - erro ao deletar pedido` });
                            }
                        });
                    });
                }
                else if (respostaProduto.data.categoriaProduto.calcado !== undefined) {
                    const newQuantidade = respostaPedido.data.quantidadePedido + respostaProduto.data.categoriaProduto.calcado.quantidade;
                    console.log(newQuantidade);
                    api_1.default.put(`${url}/atualizar-calcado/${respostaProduto.data.categoriaProduto.calcado._id}`, {
                        quantidade: newQuantidade
                    }).then(() => {
                        pedido_1.default.findByIdAndDelete(id, (err) => {
                            if (!err) {
                                res.status(200).send({ message: `pedudo deletado` });
                            }
                            else {
                                res.status(500).send({ message: `${err.message} - erro ao deletar pedido` });
                            }
                        });
                    });
                }
            })
                .catch((err) => console.log(err));
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Erro na requisição" });
    }
};
exports.default = pedidoController;
