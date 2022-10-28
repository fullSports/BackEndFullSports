const produto = require("../models/produto.js");
class produtoController {
    static listarProdutos = (req, res) => {
        produto.find()
        .populate('cnpj')
        .exec((err, produtos)=>{
            res.status(200).json(produtos);
        });
    }
    static cadastrarProduto =(req, res) => {
        let produtos = new produto(req.body);
        produtos.save((err) => {
            if (err) {
                res.status(500).send(({ message: `${err.message} - falha ao cadastrar o produto` }));
            } else {
                res.status(200).send(produtos.toJSON())
            };
        });

    }
    static atualizarProduto = (req, res) => {
        const id = req.params.id;

        produto.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: 'produto atualizado com sucesso' });
            } else {
                res.status(500).sed({ message: `Erro ao cadastrar o produto - ${err.message}` });
            };
        });
    }
    static listarProdutoId = (req, res) => {
        const id = req.params.id;
        produto.findById(id)
        .populate('cnpj')
        .exec((err, produtos) => {
            if (err) {
                res.status(400).sed({ menssage: `${err.menssage} - id do produto não encotrado` });
            } else {
                res.status(200).send(produtos);
            }
        })
    }
    static excluirProduto = (req, res) => {
        const id = req.params.id;
        produto.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({ message: 'produto deletado com sucesso' });
            } else {
                res.status(500).send({ message: `${err.message} - erro ao excluir o produto` });
            }
        });
    }
}
module.exports = produtoController;