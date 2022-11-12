const fornecedor = require("../models/fornecedor.js");
class fornecedorController {
    static listarFornecedor = (req, res) => {
        fornecedor.find((err, fornecedor) => {
            res.status(200).json(fornecedor)
        })
    }
    static cadastrarFornecedor = async (req, res) => {
        let fornecedors = new fornecedor(req.body);
        const {cnpj} = req.body;

       try{
        const fornecedorExiste = await fornecedor.findOne({cnpj})

        if(!fornecedorExiste){
            fornecedors.save((err) => {
                if (err) {
                    res.status(500).send(({ message: `${err.message} - falha ao cadastrar o fornecedor` }));
                } else {
                    res.status(200).send(fornecedors.toJSON())
                };
            });
        }else{
            res.status(200).send(({ message: "cnpj ja cadastrado" }))
        }
       }catch (error) {
        res.status(500).json({ message: "Erro ao pesquisar cnpj" })
    }

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