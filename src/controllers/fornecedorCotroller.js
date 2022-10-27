const fornecedor = require("../models/fornecedor.js");
class fornecedorController {
    static listarFornecedor = (req, res) => {
        fornecedor.find((err, fornecedor) => {
            res.status(200).json(fornecedor)
        })
    }
    static cadastrarFornecedor = (req, res) => {
        let fornecedors = new fornecedor(req.body);
        fornecedors.save((err) => {
            if (err) {
                res.status(500).send(({ message: `${err.message} - falha ao cadastrar o fornecedor` }));
            } else {
                res.status(200).send(fornecedors.toJSON())
            };
        });

    }
    static atualizarfornecedor = (req, res) => {
        const id = req.params.id;

        fornecedor.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: 'fornecedor atualizado com sucesso' });
            } else {
                res.status(500).sed({ message: `Erro ao cadastrar o fornecedor - ${err.message}` });
            };
        });
    }
    static listarFornecedorId = (req, res) => {
        const id = req.params.id;

        fornecedor.findById(id, (err, fornecedors) => {
            if (err) {
                res.status(400).sed({ menssage: `${err.menssage} - id do fornecedor não encotrado` });
            } else {
                res.status(200).send(fornecedors);
            }
        })
    }
    static excluirFornecedor = (req, res) => {
        const id = req.params.id;
        fornecedor.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({ message: 'fornecedor deletado com sucesso' });
            } else {
                res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
            }
        });
    }
}
module.exports = fornecedorController;