const roupa = require("./../../models/categorias/roupa.js")
const Imagem = require("../../models/imagem.js");
class roupaController {
    static listarRoupas = (req, res) => {
        roupa.find()
            .populate('fornecedor')
            .populate('imagemProduto')
            .exec((err, roupas) => {
                res.status(200).json(roupas);
            });
    }
    static cadastrarRoupa = (req, res) => {
        let roupas = new roupa(req.body);
        roupas.save((err) => {
            if (err) {
                res.status(500).send(({ message: `${err.message} - falha ao cadastrar o roupa` }));
            } else {
                res.status(200).send(roupas.toJSON())
            };
        });

    }
    static atualizarRoupa = (req, res) => {
        const id = req.params.id;

        roupa.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: 'roupa atualizado com sucesso' });
            } else {
                res.status(500).sed({ message: `Erro ao cadastrar o roupa - ${err.message}` });
            };
        });
    }
    static listarRoupaId = (req, res) => {
        const id = req.params.id;
        roupa.findById(id)
            .populate('fornecedor')
            .populate('imagemProduto')
            .exec((err, roupas) => {
                if (err) {
                    res.status(400).sed({ menssage: `${err.menssage} - id do roupa não encotrado` });
                } else {
                    res.status(200).send(roupas);
                }
            })
    }
    static excluirRoupaEimagem = (req, res) => {
        const id = req.params.id;

        let url = process.env.APP_URL + "/listar-roupa/" + id;
        console.log(url)
        var XMLHttpRequest = require('xhr2');
        let req1 = new XMLHttpRequest();
        req1.open("GET", url)
        req1.send();
        req1.onload = async () => {
            if (req1.status === 200) {
                let resposta = JSON.parse(req1.response);

                if(resposta.imagemProduto === null){
                    roupa.findByIdAndDelete(id, (err) => {
                        if (!err) {
                            res.status(200).send({ message: 'roupa  deletado com sucesso1' });
                        } else {
                            res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
                        }
                    });
                }else{
                    roupa.findById(id,async (err) => {
                        if (!err) {
                            resposta.imagemProduto.map(async item=>{
                            const imagem = await Imagem.findById(item._id);
                            await imagem.remove();
                            })
                            const roupaDelete = await roupa.findById(id)
                            roupaDelete.remove()
                            res.status(200).send({ message: 'roupa deletado com sucesso-' });
                        } else {
                            res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
                        }
                    });
                }
            }
        }
    }
    static excluirRoupa = (req,res)=>{
        const id = req.params.id;
        roupa.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({ message: 'roupa  deletado com sucesso1' });
            } else {
                res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
            }
        });
    }
}
module.exports = roupaController;