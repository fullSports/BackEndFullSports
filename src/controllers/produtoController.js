const produto = require("../models/produto.js");
const Imagem = require("../models/imagem.js");
class produtoController {
    static listarProdutos = (req, res) => {
        produto.find()
            .populate('fornecedor')
            .populate('imagemProduto')
            .exec((err, produtos) => {
                res.status(200).json(produtos);
            });
    }
    static cadastrarProduto = (req, res) => {
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
            .populate('fornecedor')
            .populate('imagemProduto')
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

        let url = process.env.APP_URL + "/listar-produto/" + id;
        console.log(url)
        var XMLHttpRequest = require('xhr2');
        let req1 = new XMLHttpRequest();
        req1.open("GET", url)
        req1.send();
        req1.onload = async () => {
            if (req1.status === 200) {
                let resposta = JSON.parse(req1.response);

                if(resposta.imagemProduto === null){
                    produto.findByIdAndDelete(id, (err) => {
                        if (!err) {
                            res.status(200).send({ message: 'produto  deletado com sucesso1' });
                        } else {
                            res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
                        }
                    });
                }else{
                    produto.findById(id,async (err) => {
                        if (!err) {
                            resposta.imagemProduto.map(async item=>{
                            const imagem = await Imagem.findById(item._id);
                            await imagem.remove();
                            })
                            const produtoDelete = await produto.findById(id)
                            produtoDelete.remove()
                            res.status(200).send({ message: 'produto deletado com sucesso-' });
                        } else {
                            res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
                        }
                    });
                }
            }
        }

    }
}
module.exports = produtoController;