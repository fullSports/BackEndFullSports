import {produto} from '../../models/ModelProduto/produto'
import {Response,Request} from 'express';
import api from '../../config/api/api';
export class produtoController {
    static listarProdutos = (req:Request, res:Response) => {
        produto.find()
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
                        path:'calcado',
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
    }
    static cadastrarProduto = (req:Request, res:Response) => {
        let produtos = new produto(req.body);

        produtos.save((err) => {
            if (err) {
                res.status(500).send(({ message: `${err.message} - falha ao cadastrar o produto` }));
            } else {
                res.status(200).send(produtos.toJSON())
            };
        });

    }
    static atualizarProduto = (req:Request, res:Response) => {
        const id = req.params.id;
        
        produto.findByIdAndUpdate(id, { $set: req.body }, (err:Error) => {
            if (!err) {
                res.status(200).send({ message: 'produto atualizado com sucesso' });
            } else {
                res.status(500).send({ message: `Erro ao atualizar o produto - ${err.message}` });
            };
        });
    }
    static listarProdutoId = (req:Request, res:Response) => {
        const id = req.params.id;
        produto.findById(id)
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
                    path:'calcado',
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
                } else {
                    res.status(200).send(produtos);
                }
            })
    }
    static excluirProduto = (req:Request, res:Response) => {
        const id = req.params.id;
        api.request({
            method: "GET",
            url: `listar-produto/${id}`
        }).then(async (resposta) => {
            const categoria = resposta.data.categoriaProduto;
            if (categoria.roupa != undefined) {
                return api.delete(`deletar-roupa-e-imagem/${categoria.roupa._id}`)
                    .then(async (resposta) => {
                        const produtoDelete = await produto.findById(id)
                        produtoDelete?.remove()
                        res.status(200).send({ message: 'produto deletado com sucesso-' });
                    }).catch((err) => console.log(err))
            }
            if (categoria.suplemento != undefined) {
                return api.delete(`deletar-suplemento-e-imagem/${categoria.suplemento._id}`)
                    .then(async (resposta) => {
                        const produtoDelete = await produto.findById(id)
                        produtoDelete?.remove()
                        res.status(200).send({ message: 'produto deletado com sucesso-' });
                    }).catch((err) => console.log(err))
            }
            if (categoria.equipamento != undefined) {
                return api.delete(`deletar-equipamento-e-imagem/${categoria.equipamento._id}`)
                    .then(async (resposta) => {
                        const produtoDelete = await produto.findById(id)
                        produtoDelete?.remove()
                        res.status(200).send({ message: 'produto deletado com sucesso-' });
                    }).catch((err) => console.log(err))
            }
            if (categoria.calcado != undefined) {
                return api.delete(`deletar-calcado-e-imagem/${categoria.calcado._id}`)
                    .then(async (resposta) => {
                        const produtoDelete = await produto.findById(id)
                        produtoDelete?.remove()
                        res.status(200).send({ message: 'produto deletado com sucesso-' });
                    }).catch((err) => console.log(err))
            }

        })
    }
}