const suplemento = require("./../../models/categorias/suplemento.js")
const Imagem = require("../../models/imagem.js");
class suplementoController {
    static listarsuplementos = (req, res) => {
        suplemento.find()
            .populate('fornecedor')
            .populate('imagemProduto')
            .exec((err, suplementos) => {
                res.status(200).json(suplementos);
            });
    }
    static cadastrarsuplemento = (req, res) => {
        let suplementos = new suplemento(req.body);
        suplementos.save((err) => {
            if (err) {
                res.status(500).send(({ message: `${err.message} - falha ao cadastrar o suplemento` }));
            } else {
                res.status(200).send(suplementos.toJSON())
            };
        });

    }
    static atualizarsuplemento = (req, res) => {
        const id = req.params.id;

        suplemento.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: 'suplemento atualizado com sucesso' });
            } else {
                res.status(500).sed({ message: `Erro ao cadastrar o suplemento - ${err.message}` });
            };
        });
    }
    static listarsuplementoId = (req, res) => {
        const id = req.params.id;
        suplemento.findById(id)
            .populate('fornecedor')
            .populate('imagemProduto')
            .exec((err, suplementos) => {
                if (err) {
                    res.status(400).sed({ menssage: `${err.menssage} - id do suplemento não encotrado` });
                } else {
                    res.status(200).send(suplementos);
                }
            })
    }
    static excluirsuplemento = (req, res) => {
        const id = req.params.id;

        let url = process.env.APP_URL + "/listar-suplemento/" + id;
        console.log(url)
        var XMLHttpRequest = require('xhr2');
        let req1 = new XMLHttpRequest();
        req1.open("GET", url)
        req1.send();
        req1.onload = async () => {
            if (req1.status === 200) {
                let resposta = JSON.parse(req1.response);

                if(resposta.imagemProduto === null){
                    suplemento.findByIdAndDelete(id, (err) => {
                        if (!err) {
                            res.status(200).send({ message: 'suplemento  deletado com sucesso1' });
                        } else {
                            res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
                        }
                    });
                }else{
                    suplemento.findById(id,async (err) => {
                        if (!err) {
                            resposta.imagemProduto.map(async item=>{
                            const imagem = await Imagem.findById(item._id);
                            await imagem.remove();
                            })
                            const suplementoDelete = await suplemento.findById(id)
                            suplementoDelete.remove()
                            res.status(200).send({ message: 'suplemento deletado com sucesso-' });
                        } else {
                            res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
                        }
                    });
                }
            }
        }

    }
}
module.exports = suplementoController;