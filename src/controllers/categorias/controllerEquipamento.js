const equipamento = require("./../../models/categorias/equipamento.js")
const Imagem = require("../../models/imagem.js");
class equipamentoController {
    static listarequipamento = (req, res) => {
        equipamento.find()
            .populate('fornecedor')
            .populate('imagemProduto')
            .exec((err, equipamentos) => {
                res.status(200).json(equipamentos);
            });
    }
    static cadastrarequipamento = (req, res) => {
        let equipamentos = new equipamento(req.body);
        equipamentos.save((err) => {
            if (err) {
                res.status(500).send(({ message: `${err.message} - falha ao cadastrar o equipamento` }));
            } else {
                res.status(200).send(equipamentos.toJSON())
            };
        });

    }
    static atualizarequipamento = (req, res) => {
        const id = req.params.id;

        equipamento.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: 'equipamento atualizado com sucesso' });
            } else {
                res.status(500).sed({ message: `Erro ao cadastrar o equipamento - ${err.message}` });
            };
        });
    }
    static listarequipamentoId = (req, res) => {
        const id = req.params.id;
        equipamento.findById(id)
            .populate('fornecedor')
            .populate('imagemProduto')
            .exec((err, equipamentos) => {
                if (err) {
                    res.status(400).sed({ menssage: `${err.menssage} - id do equipamento não encotrado` });
                } else {
                    res.status(200).send(equipamentos);
                }
            })
    }
    static excluirEquipamentoEimagem = (req, res) => {
        const id = req.params.id;

        let url = process.env.APP_URL + "/listar-equipamento/" + id;
        console.log(url)
        var XMLHttpRequest = require('xhr2');
        let req1 = new XMLHttpRequest();
        req1.open("GET", url)
        req1.send();
        req1.onload = async () => {
            if (req1.status === 200) {
                let resposta = JSON.parse(req1.response);

                if(resposta.imagemProduto === null){
                    equipamento.findByIdAndDelete(id, (err) => {
                        if (!err) {
                            res.status(200).send({ message: 'equipamento  deletado com sucesso1' });
                        } else {
                            res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
                        }
                    });
                }else{
                    equipamento.findById(id,async (err) => {
                        if (!err) {
                            resposta.imagemProduto.map(async item=>{
                            const imagem = await Imagem.findById(item._id);
                            await imagem.remove();
                            })
                            const equipamentoDelete = await equipamento.findById(id)
                            equipamentoDelete.remove()
                            res.status(200).send({ message: 'equipamento deletado com sucesso-' });
                        } else {
                            res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
                        }
                    });
                }
            }
        }

    }
    static excluirEquipamento = (req,res) =>{
        const id = req.params.id;
        equipamento.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({ message: 'equipamento  deletado com sucesso1' });
            } else {
                res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
            }
        });
    }
}
module.exports = equipamentoController;