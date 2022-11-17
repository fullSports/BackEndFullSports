const calcado = require("./../../models/categorias/calcado.js")
const Imagem = require("../../models/imagem.js");
class calcadoController {
    static listarcalcado = (req, res) => {
        calcado.find()
            .populate('fornecedor')
            .populate('imagemProduto')
            .exec((err, calcados) => {
                res.status(200).json(calcados);
            });
    }
    static cadastrarcalcado = (req, res) => {
        let calcados = new calcado(req.body);
        calcados.save((err) => {
            if (err) {
                res.status(500).send(({ message: `${err.message} - falha ao cadastrar o calcado` }));
            } else {
                res.status(200).send(calcados.toJSON())
            };
        });

    }
    static atualizarcalcado = (req, res) => {
        const id = req.params.id;

        calcado.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: 'calcado atualizado com sucesso' });
            } else {
                res.status(500).sed({ message: `Erro ao cadastrar o calcado - ${err.message}` });
            };
        });
    }
    static listarcalcadoId = (req, res) => {
        const id = req.params.id;
        calcado.findById(id)
            .populate('fornecedor')
            .populate('imagemProduto')
            .exec((err, calcados) => {
                if (err) {
                    res.status(400).sed({ menssage: `${err.menssage} - id do calcado não encotrado` });
                } else {
                    res.status(200).send(calcados);
                }
            })
    }
    static excluirCalcadoEimagem = (req, res) => {
        const id = req.params.id;

        let url = process.env.APP_URL + "/listar-calcado/" + id;
        console.log(url)
        var XMLHttpRequest = require('xhr2');
        let req1 = new XMLHttpRequest();
        req1.open("GET", url)
        req1.send();
        req1.onload = async () => {
            if (req1.status === 200) {
                let resposta = JSON.parse(req1.response);

                if(resposta.imagemProduto === null){
                    calcado.findByIdAndDelete(id, (err) => {
                        if (!err) {
                            res.status(200).send({ message: 'calcado  deletado com sucesso1' });
                        } else {
                            res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
                        }
                    });
                }else{
                    calcado.findById(id,async (err) => {
                        if (!err) {
                            resposta.imagemProduto.map(async item=>{
                            const imagem = await Imagem.findById(item._id);
                            await imagem.remove();
                            })
                            const calcadoDelete = await calcado.findById(id)
                            calcadoDelete.remove()
                            res.status(200).send({ message: 'calcado deletado com sucesso-' });
                        } else {
                            res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
                        }
                    });
                }
            }
        }
    }
    static ExcluirCalcado =(req,res) =>{
        const id = req.params.id;
        calcado.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({ message: 'calcado  deletado com sucesso1' });
            } else {
                res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
            }
        });
    }
}
module.exports = calcadoController;