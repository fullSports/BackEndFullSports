const pedido = require("../models/pedido.js");
const produto = require ("../models/produto.js");
class pedidoController{
    static addItemCarrinho = async (req, res) => {
        let carrinho = new pedido(req.body);
        const {quantidade} = req.body;
        try {
            let detalhesProduto = await produto.findById(id);
                 if (!detalhesProduto) {
                return res.status(500).json({
                    type: "Not encontrado",
                    msg: "Solicitacao Invalido"
                })
            }
            if (carrinho) {
                const indexFound = carrinho.items.findIndex(item => item.id.id == id);
                if (indexFound !== -1 && quantidade <= 0) {
                    carrinho.items.splice(indexFound, 1);
                    if (carrinho.items.length == 0) {
                        carrinho.subTotal = 0;
                    } else {
                        carrinho.subTotal = carrinho.items.map(item => item.total).reduce((acc, next) => acc + next);
                    }
                }
                else if (indexFound !== -1) {
                    carrinho.items[indexFound].quantidade = carrinho.items[indexFound].quantidade + quantidade;
                    carrinho.items[indexFound].total = carrinho.items[indexFound].quantidade * detalhesProduto.preco;
                    carrinho.items[indexFound].preco = detalhesProduto.preco
                    carrinho.subTotal = carrinho.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
                else if (quantidade > 0) {
                    carrinho.items.push({
                        id: id,
                        quantidade: quantidade,
                        preco: detalhesProduto.preco,
                        total: parseInt(detalhesProduto.preco * quantidade)
                    })
                    carrinho.subTotal = carrinho.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
                else {
                    return res.status(400).json({
                        type: "Invalido",
                        msg: "Solicitacao Invalidoa"
                    })
                }
                let data = await carrinho.save();
                res.status(200).json({
                    type: "sucesso",
                    mgs: "Processo foi um sucesso",
                    data: data
                })
            }
            else {
                const carrinhoData = {
                    items: [{
                        id: id,
                        quantidade: quantidade,
                        total: parseInt(detalhesProduto.preco * quantidade),
                        preco: detalhesProduto.preco
                    }],
                    subTotal: parseInt(detalhesProduto.preco * quantidade)
                }
                carrinho = await carrinhoRepository.addItem(carrinhoData)
                res.json(carrinho);
            }
        } catch (err) {
            console.log(err)
            res.status(400).json({
                type: "Invalido",
                msg: "Algo está errado",
                err: err
            })
        }
    }
    static getcarrinho = async (req, res) => {
        try {
            let carrinho = await carrinhoRepository.carrinho()
            if (!carrinho) {
                return res.status(400).json({
                    type: "Invalido",
                    msg: "carrinho Not Found",
                })
            }
            res.status(200).json({
                status: true,
                data: carrinho
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({
                type: "Invalido",
                msg: "Algo está errado",
                err: err
            })
        }
    }
    
    static emptycarrinho = async (req, res) => {
        try {
            let carrinho = await carrinhoRepository.carrinho();
            carrinho.items = [];
            carrinho.subTotal = 0
            let data = await carrinho.save();
            res.status(200).json({
                type: "succeso",
                mgs: "carrinho está vazio",
                data: data
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({
                type: "Invalido",
                msg: "Algo está errado",
                err: err
            })
        }
    }
}
module.exports = pedidoController