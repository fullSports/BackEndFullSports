const cliente = require("../models/cliente.js");
const Imagem = require("../models/imagem.js");
require('dotenv').config()

class clienteController {
    static listarClientes = (req, res) => {
        cliente.find()
            .populate("imagemPerfil")
            .populate({
                path: "login",
                populate:[
                    {
                        path: "adm"
                    },
                    {
                        path: "cliente"
                    }
                ]
            })
            .exec((err, cliente) => {
                res.status(200).json(cliente)
            })
    }
    static cadastrarCliente = (req, res) => {
        let clientes = new cliente(req.body);
        clientes.save((err) => {
            if (err) {
                res.status(500).send(({ message: `${err.message} - falha ao cadastrar o cliente` }));
            } else {
                res.status(200).send(clientes.toJSON())
            };
        });
    }
    static atualizarCliente = (req, res) => {
        const id = req.params.id;

        cliente.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: 'cliente atualizado com sucesso' });
            } else {
                res.status(500).sed({ message: `Erro ao cadastrar o cliente - ${err.message}` });
            };
        });
    }
    static listarClienteId = (req, res) => {
        const id = req.params.id;
        cliente.findById(id)
            .populate('imagemPerfil')
            .exec((err, clientes) => {
                if (err) {
                    res.status(400).sed({ menssage: `${err.menssage} - id do cliente não encotrado` });
                } else {
                    res.status(200).send(clientes);
                }
            })
    }
    static excluirCliente = async (req, res) => {
        const id = req.params.id;

        let url = process.env.APP_URL + "/listar-cliente/" + id
        console.log(url)
        var XMLHttpRequest = require('xhr2');
        let req1 = new XMLHttpRequest();
        req1.open("GET", url)
        req1.send();
        req1.onload = async (err) => {
            if (req1.status === 200) {
                let resposta = JSON.parse(req1.response);

                if (resposta.imagemPerfil == null) {
                    cliente.findByIdAndDelete(id, (err) => {
                        if (!err) {
                            res.status(200).send({ message: 'cliente deletado com sucesso' });
                        } else {
                            res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
                        }
                    });
                } else {
                    cliente.findByIdAndDelete(id, async (err) => {
                        if (!err) {
                            const imagem = await Imagem.findById(resposta.imagemPerfil._id);
                            await imagem.remove();
                            res.status(200).send({ message: 'cliente deletado com sucesso' });
                        } else {
                            res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
                        }
                    });
                }
            }
        }
    }



}
module.exports = clienteController;