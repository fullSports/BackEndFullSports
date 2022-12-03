import api from "../../config/api/api";
import pedido from "../../models/ModelPedidos/pedido";
import produto from "../../models/ModelProduto/produto";
import { Request, Response } from 'express';
import IPedido from "../../interfaces/IPedido";
import IProduto from "../../interfaces/IProduto";
import IRoupa from "../../interfaces/Produtos/IRoupa";
import IEquipamentos from "../../interfaces/Produtos/IEquipamentos";
import ISuplementos from "../../interfaces/Produtos/ISuplementos";
import ICacados from "../../interfaces/Produtos/ICalcados";
require('dotenv').config();
const url = process.env.APP_URL
class pedidoController {
    static ListarPedido = (req: Request, res: Response) => {
        pedido.find()
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
                    res.status(500).send(({ message: "erro ao listar os pedidos" }))
                } else {
                    res.status(200).json(pedidoI)
                }
            })
    }
    static ListaPedidoId = (req: Request, res: Response) => {
        const id = req.params.id;
        pedido.findById(id).populate({
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
                res.status(500).send(({ message: "erro ao listar o pedido" }))
            } else {
                res.status(200).json(pedidoId)
            }
        })
    }
    static RealizarPedido = (req: Request, res: Response) => {
        const { quantidadePedido, produto, cliente } = req.body;
        try {
            if (quantidadePedido < 1) {
                res.status(500).send({ message: "minimo de 1 para realizar o pedido" })
            } else api.get(`/listar-produto/${produto}`)
                .then(resposta => {
                    if (resposta.data.categoriaProduto.roupa !== undefined) {
                        const newQuantidade = resposta.data.categoriaProduto.roupa.quantidade - quantidadePedido
                        var precoProduto = resposta.data.categoriaProduto.roupa.preco;
                        var newPrecoProduto = parseFloat(precoProduto.replace(',', '.'))
                        var totalPedio = quantidadePedido * newPrecoProduto
                        if (newQuantidade <= 0) {
                            res.status(500).send({ message: "quantidade do produto maior que a disponivel" })
                        } else {
                            api.put(`/atualizar-roupa/${resposta.data.categoriaProduto.roupa._id}`, {
                                quantidade: newQuantidade
                            }).then(respoataCategoria => {
                                console.log(respoataCategoria.data)

                                let newPedido = new pedido({
                                    quantidadePedido: quantidadePedido,
                                    produto: produto,
                                    cliente: cliente,
                                    total: totalPedio,
                                });
                                newPedido.save((err) => {
                                    if (err) {
                                        res.status(500).send(({ message: `falha ao cadastrar o pedido ${err.message}` }))
                                    } else {
                                        res.status(200).send({ message: "pedido cadastrado com sucesso" })
                                    }
                                })
                            })
                                .catch((err) => console.log(err));
                        }
                    } else if (resposta.data.categoriaProduto.equipamento !== undefined) {
                        const newQuantidade = resposta.data.categoriaProduto.equipamento.quantidade - quantidadePedido;
                        let precoProduto = resposta.data.categoriaProduto.equipamento.preco;
                        var newPrecoProduto = parseFloat(precoProduto.replace(',', '.'))
                        var totalPedio = quantidadePedido * newPrecoProduto
                        if (newQuantidade <= 0) {
                            res.status(500).send({ message: "quantidade do produto maior que a disponivel" })
                        } else {
                            api.put(`/atualizar-equipamento/${resposta.data.categoriaProduto.equipamento._id}`, {
                                quantidade: newQuantidade
                            }).then(respoataCategoria => {
                                console.log(respoataCategoria.data);
                                let newPedido = new pedido({
                                    quantidadePedido: quantidadePedido,
                                    produto: produto,
                                    cliente: cliente,
                                    total: totalPedio,
                                });
                                newPedido.save((err) => {
                                    if (err) {
                                        res.status(500).send(({ message: `falha ao cadastrar o pedido ${err.message}` }))
                                    } else {
                                        res.status(200).send({ message: "pedido cadastrado com sucesso" })
                                    }
                                })
                            })
                        }
                    } else if (resposta.data.categoriaProduto.suplemento !== undefined) {
                        const newQuantidade = resposta.data.categoriaProduto.suplemento.quantidade - quantidadePedido;
                        let precoProduto = resposta.data.categoriaProduto.suplemento.preco;
                        var newPrecoProduto = parseFloat(precoProduto.replace(',', '.'))
                        var totalPedio = quantidadePedido * newPrecoProduto
                        if (newQuantidade <= 0) {
                            res.status(500).send({ message: "quantidade do produto maior que a disponivel" })
                        } else {
                            api.put(`/atualizar-suplemento/${resposta.data.categoriaProduto.suplemento._id}`, {
                                quantidade: newQuantidade
                            }).then(respoataCategoria => {
                                console.log(respoataCategoria.data);
                                let newPedido = new pedido({
                                    quantidadePedido: quantidadePedido,
                                    produto: produto,
                                    cliente: cliente,
                                    total: totalPedio,
                                });
                                newPedido.save((err) => {
                                    if (err) {
                                        res.status(500).send(({ message: `falha ao cadastrar o pedido ${err.message}` }))
                                    } else {
                                        res.status(200).send({ message: "pedido cadastrado com sucesso" })
                                    }
                                })
                            })
                        }
                    } else if (resposta.data.categoriaProduto.calcado !== undefined) {
                        const newQuantidade = resposta.data.categoriaProduto.calcado.quantidade - quantidadePedido;
                        let precoProduto = resposta.data.categoriaProduto.calcado.preco;
                        var newPrecoProduto = parseFloat(precoProduto.replace(',', '.'))
                        var totalPedio = quantidadePedido * newPrecoProduto

                        if (newQuantidade <= 0) {
                            res.status(500).send({ message: "quantidade do produto maior que a disponivel" })
                        } else {
                            api.put(`/atualizar-calcado/${resposta.data.categoriaProduto.calcado._id}`, {
                                quantidade: newQuantidade
                            }).then(respoataCategoria => {
                                console.log(respoataCategoria.data);
                                let newPedido = new pedido({
                                    quantidadePedido: quantidadePedido,
                                    produto: produto,
                                    cliente: cliente,
                                    total: totalPedio,
                                });
                                newPedido.save((err) => {
                                    if (err) {
                                        res.status(500).send(({ message: `falha ao cadastrar o pedido ${err.message}` }))
                                    } else {
                                        res.status(200).send({ message: "pedido cadastrado com sucesso" })
                                    }
                                })
                            })
                        }
                    }
                }).catch((err) => console.log(err));
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "Erro na requisição" })
        }
    }
    static CancelarPedido = (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            api.get<IPedido>(`/listar-pedido/${id}`)
                .then(respostaPedido => {
                    api.get<IProduto>(`/listar-produto/${respostaPedido.data.produto._id}`)
                        .then(respostaProduto => {
                            console.log(respostaProduto.data)
                            if (respostaProduto.data.categoriaProduto.roupa !== undefined) {
                                const newQuantidade = respostaPedido.data.quantidadePedido + respostaProduto.data.categoriaProduto.roupa.quantidade;
                                console.log(newQuantidade)
                                api.put<IRoupa>(`/atualizar-roupa/${respostaProduto.data.categoriaProduto.roupa._id}`, {
                                    quantidade: newQuantidade
                                }).then(() => {
                                    setTimeout(function () {
                                        pedido.findByIdAndDelete(id, (err: Error) => {
                                            if (!err) {
                                                res.status(200).send({ message: `pedudo deletado` });
                                            } else {
                                                res.status(500).send({ message: `${err.message} - erro ao deletar pedido` });
                                            }
                                        })
                                    }, 1000)
                                }).catch((err) =>{console.log(err)
                                    res.status(500).json({ message: "Erro na requisição-atualizar-produto" })
                                });
                            } else if (respostaProduto.data.categoriaProduto.equipamento !== undefined) {
                                const newQuantidade = respostaPedido.data.quantidadePedido + respostaProduto.data.categoriaProduto.equipamento.quantidade;
                                console.log(newQuantidade)
                                api.put<IEquipamentos>(`/atualizar-equipamento/${respostaProduto.data.categoriaProduto.equipamento._id}`, {
                                    quantidade: newQuantidade
                                }).then(() => {
                                    setTimeout(function () {
                                        pedido.findByIdAndDelete(id, (err: Error) => {
                                            if (!err) {
                                                res.status(200).send({ message: `pedudo deletado` });
                                            } else {
                                                res.status(500).send({ message: `${err.message} - erro ao deletar pedido` });
                                            }
                                        })
                                    }, 1000)
                                }).catch((err) =>{console.log(err)
                                    res.status(500).json({ message: "Erro na requisição-atualizar-produto" })
                                });
                            } else if (respostaProduto.data.categoriaProduto.suplemento !== undefined) {
                                const newQuantidade = respostaPedido.data.quantidadePedido + respostaProduto.data.categoriaProduto.suplemento.quantidade;
                                console.log(newQuantidade)
                                api.put<ISuplementos>(`/atualizar-suplemento/${respostaProduto.data.categoriaProduto.suplemento._id}`, {
                                    quantidade: newQuantidade
                                }).then(() => {
                                    setTimeout(function () {
                                        pedido.findByIdAndDelete(id, (err: Error) => {
                                            if (!err) {
                                                res.status(200).send({ message: `pedudo deletado` });
                                            } else {
                                                res.status(500).send({ message: `${err.message} - erro ao deletar pedido` });
                                            }
                                        })
                                    }, 1000)
                                }).catch((err) =>{console.log(err)
                                    res.status(500).json({ message: "Erro na requisição-atualizar-produto" })
                                });
                            } else if (respostaProduto.data.categoriaProduto.calcado !== undefined) {
                                const newQuantidade = respostaPedido.data.quantidadePedido + respostaProduto.data.categoriaProduto.calcado.quantidade;
                                console.log(newQuantidade)
                                api.put<ICacados>(`/atualizar-calcado/${respostaProduto.data.categoriaProduto.calcado._id}`, {
                                    quantidade: newQuantidade
                                }).then(() => {
                                    setTimeout(function () {
                                        pedido.findByIdAndDelete(id, (err: Error) => {
                                            if (!err) {
                                                res.status(200).send({ message: `pedudo deletado` });
                                            } else {
                                                res.status(500).send({ message: `${err.message} - erro ao deletar pedido` });
                                            }
                                        })
                                    }, 1000)
                                }).catch((err) =>{console.log(err)
                                    res.status(500).json({ message: "Erro na requisição-atualizar-produto" })
                                });

                            }
                        })
                        .catch((err) =>{console.log(err)
                            res.status(500).json({ message: "Erro na requisição-listar produto" })
                        });
                })
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "Erro na requisição" })
        }
    }
}
export default pedidoController