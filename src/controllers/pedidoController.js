const api = require("../config/api.js");
const pedido = require("../models/pedido.js");
const produto = require("../models/produto.js");
require('dotenv').config();
const url = process.env.APP_URL
class pedidoController {
    // static addItemCarrinho = async (req, res) => {
    //     let carrinho = new pedido(req.body);
    //     const {quantidadePedido} = req.body;
    //     try {
    //         let detalhesProduto = await produto.findById(carrinho.IdProduto._id);
    //              if (!detalhesProduto) {
    //             return res.status(500).json({
    //                 type: "Not encontrado",
    //                 msg: "Solicitacao Invalido"
    //             })
    //         }
    //         if (carrinho) {
    //             const indexFound = carrinho.items.findIndex(item => item.id.id == id);
    //             if (indexFound !== -1 && quantidadePedido <= 0) {
    //                 carrinho.items.splice(indexFound, 1);
    //                 if (carrinho.items.length == 0) {
    //                     carrinho.subTotal = 0;
    //                 } else {
    //                     carrinho.subTotal = carrinho.items.map(item => item.total).reduce((acc, next) => acc + next);
    //                 }
    //             }
    //             else if (indexFound !== -1) {
    //                 carrinho.items[indexFound].quantidadePedido = carrinho.items[indexFound].quantidadePedido + quantidadePedido;
    //                 carrinho.items[indexFound].total = carrinho.items[indexFound].quantidadePedido * detalhesProduto.preco;
    //                 carrinho.items[indexFound].preco = detalhesProduto.preco
    //                 carrinho.subTotal = carrinho.items.map(item => item.total).reduce((acc, next) => acc + next);
    //             }
    //             else if (quantidadePedido > 0) {
    //                 carrinho.items.push({
    //                     id: id,
    //                     quantidadePedido: quantidadePedido,
    //                     preco: detalhesProduto.preco,
    //                     total: parseInt(detalhesProduto.preco * quantidadePedido)
    //                 })
    //                 carrinho.subTotal = carrinho.items.map(item => item.total).reduce((acc, next) => acc + next);
    //             }
    //             else {
    //                 return res.status(400).json({
    //                     type: "Invalido",
    //                     msg: "Solicitacao Invalidoa"
    //                 })
    //             }
    //             let data = await carrinho.save();
    //             res.status(200).json({
    //                 type: "sucesso",
    //                 mgs: "Processo foi um sucesso",
    //                 data: data
    //             })
    //         }
    //         else {
    //             const carrinhoData = {
    //                 items: [{
    //                     id: id,
    //                     quantidadePedido: quantidadePedido,
    //                     total: parseInt(detalhesProduto.preco * quantidadePedido),
    //                     preco: detalhesProduto.preco
    //                 }],
    //                 subTotal: parseInt(detalhesProduto.preco * quantidadePedido)
    //             }
    //             carrinho = await carrinhoRepository.addItem(carrinhoData)
    //             res.json(carrinho);
    //         }
    //     } catch (err) {
    //         console.log(err)
    //         res.status(400).json({
    //             type: "Invalido",
    //             msg: "Algo está errado",
    //             err: err
    //         })
    //     }
    // }
    // static getcarrinho = async (req, res) => {
    //     try {
    //         let carrinho = await carrinhoRepository.carrinho()
    //         if (!carrinho) {
    //             return res.status(400).json({
    //                 type: "Invalido",
    //                 msg: "carrinho Not Found",
    //             })
    //         }
    //         res.status(200).json({
    //             status: true,
    //             data: carrinho
    //         })
    //     } catch (err) {
    //         console.log(err)
    //         res.status(400).json({
    //             type: "Invalido",
    //             msg: "Algo está errado",
    //             err: err
    //         })
    //     }
    // }

    // static emptycarrinho = async (req, res) => {
    //     try {
    //         let carrinho = await carrinhoRepository.carrinho();
    //         carrinho.items = [];
    //         carrinho.subTotal = 0
    //         let data = await carrinho.save();
    //         res.status(200).json({
    //             type: "succeso",
    //             mgs: "carrinho está vazio",
    //             data: data
    //         })
    //     } catch (err) {
    //         console.log(err)
    //         res.status(400).json({
    //             type: "Invalido",
    //             msg: "Algo está errado",
    //             err: err
    //         })
    //     }
    // }
    static ListarPedido = (req, res) => {
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
                    }
                ]
            })
            .exec((err, pedidoI) => {
                if (err) {
                    res.status(500).send(({ message: "erro ao listar o pedido" }))
                } else {
                    res.status(200).json(pedidoI)
                }
            })
    }
    static RealizarPedido = (req, res) => {
        const { quantidadePedido, produto} = req.body;
        try {
            api.get(`${url}/listar-produto/${produto}`)
                .then(resposta => {
                    if (resposta.data.categoriaProduto.roupa !== undefined) {
                        const newQuantidade = resposta.data.categoriaProduto.roupa.quantidade - quantidadePedido
                        var precoProduto = resposta.data.categoriaProduto.roupa.preco;
                        var newPrecoProduto = parseFloat(precoProduto.replace(',', '.'))
                        var totalPedio = quantidadePedido * newPrecoProduto

                        api.put(`${url}/atualizar-roupa/${resposta.data.categoriaProduto.roupa._id}`, {
                            quantidade: newQuantidade
                        }).then(respoataCategoria => {
                            console.log(respoataCategoria.data)
                            let newPedido = new pedido({
                                quantidadePedido: quantidadePedido,
                                produto: produto,
                                total: totalPedio,
                            });
                            newPedido.save((err)=>{
                                if(err){
                                    res.status(500).send(({message: `falha ao cadastrar o pedido ${err.message}`}))
                                }else{
                                    res.status(200).send({message: "pedido cadastrado com sucesso"})
                                }
                            })
                        })
                            .catch((err) => console.log(err));
                    } else if (resposta.data.categoriaProduto.equipamento !== undefined) {
                        const newQuantidade = resposta.data.categoriaProduto.equipamento.quantidade - quantidadePedido;
                        let precoProduto = resposta.data.categoriaProduto.equipamento.preco;
                        var newPrecoProduto = parseFloat(precoProduto.replace(',', '.'))
                        var totalPedio = quantidadePedido * newPrecoProduto

                        api.put(`${url}/atualizar-equipamento/${resposta.data.categoriaProduto.equipamento._id}`, {
                            quantidade: newQuantidade
                        }).then(respoataCategoria => {
                            console.log(respoataCategoria.data);
                            let newPedido = new pedido({
                                quantidadePedido: quantidadePedido,
                                produto: produto,
                                total: totalPedio,
                            });
                            newPedido.save((err)=>{
                                if(err){
                                    res.status(500).send(({message: `falha ao cadastrar o pedido ${err.message}`}))
                                }else{
                                    res.status(200).send({message: "pedido cadastrado com sucesso"})
                                }
                            })
                        })
                    } else if (resposta.data.categoriaProduto.suplemento !== undefined) {
                        const newQuantidade = resposta.data.categoriaProduto.suplemento.quantidade - quantidadePedido;
                        let  precoProduto = resposta.data.categoriaProduto.suplemento.preco;
                        var newPrecoProduto = parseFloat(precoProduto.replace(',', '.'))
                        var totalPedio = quantidadePedido * newPrecoProduto

                        api.put(`${url}/atualizar-suplemento/${resposta.data.categoriaProduto.suplemento._id}`, {
                            quantidade: newQuantidade
                        }).then(respoataCategoria => {
                            console.log(respoataCategoria.data);
                            let newPedido = new pedido({
                                quantidadePedido: quantidadePedido,
                                produto: produto,
                                total: totalPedio,
                            });
                            newPedido.save((err)=>{
                                if(err){
                                    res.status(500).send(({message: `falha ao cadastrar o pedido ${err.message}`}))
                                }else{
                                    res.status(200).send({message: "pedido cadastrado com sucesso"})
                                }
                            })
                        })
                    } else if (resposta.data.categoriaProduto.calcado !== undefined) {
                        const newQuantidade = resposta.data.categoriaProduto.calcado.quantidade - quantidadePedido;
                        let precoProduto = resposta.data.categoriaProduto.calcado.preco;
                        var newPrecoProduto = parseFloat(precoProduto.replace(',', '.'))
                        var totalPedio = quantidadePedido * newPrecoProduto


                        api.put(`${url}/atualizar-calcado/${resposta.data.categoriaProduto.calcado._id}`, {
                            quantidade: newQuantidade
                        }).then(respoataCategoria => {
                            console.log(respoataCategoria.data);
                            let newPedido = new pedido({
                                quantidadePedido: quantidadePedido,
                                produto: produto,
                                total: totalPedio,
                            });
                            newPedido.save((err)=>{
                                if(err){
                                    res.status(500).send(({message: `falha ao cadastrar o pedido ${err.message}`}))
                                }else{
                                    res.status(200).send({message: "pedido cadastrado com sucesso"})
                                }
                            })
                        })
                    }
                })
                .catch((err) => console.log(err));
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "Erro na requisição" })
        }



    }
}
module.exports = pedidoController