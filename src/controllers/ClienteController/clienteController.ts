import api from "../../config/api/api";
import cliente from "../../models/ModelCliente/cliente";
const Imagem = require("../../models/imagem.js");
import Login from '../../models/ModelLogin/login';
import {Request,Response} from 'express'
require('dotenv').config()

class clienteController {
    static listarClientes = (req:Request, res:Response) => {
        cliente.find()
            .populate("imagemPerfil")
            .populate("login")
            .exec((err, cliente) => {
                res.status(200).json(cliente)
            })
    }
    static cadastrarCliente = (req:Request, res:Response) => {
        let clientes = new cliente(req.body);
        clientes.save((err) => {
            if (err) {
                res.status(500).send(({ message: `${err.message} - falha ao cadastrar o cliente` }));
            } else {
                res.status(200).send(clientes.toJSON())
            };
        });
    }
    static atualizarCliente = (req:Request, res:Response) => {
        const id = req.params.id;

        cliente.findByIdAndUpdate(id, { $set: req.body }, (err: Error) => {
            if (!err) {
                res.status(200).send({ message: 'cliente atualizado com sucesso' });
            } else {
                res.status(500).send({ message: `Erro ao cadastrar o cliente - ${err.message}` });
            };
        });
    }
    static listarClienteId = (req:Request, res:Response) => {
        const id = req.params.id;
        cliente.findById(id)
        .populate("imagemPerfil")
        .populate("login")
            .exec((err, clientes) => {
                if (err) {
                    res.status(400).send({ menssage: `${err.message} - id do cliente não encotrado` });
                } else {
                    res.status(200).send(clientes);
                }
            })
    }
    static excluirCliente = async (req:Request, res:Response) => {
        const id = req.params.id;
        api.request({
            method: "GET",
            url: `listar-cliente/${id}`,
        }).then(async resposta => {

            if (resposta.data.imagemPerfil == null || resposta.data.imagemPerfil == undefined) {
                const login = await Login.findById(resposta.data.login._id)
                await login?.remove();
                cliente.findByIdAndDelete(id, (err: Error) => {
                    if (!err) {
                        res.status(200).send({ message: 'cliente deletado com sucesso' });
                    } else {
                        res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
                    }
                });
            } else {
                console.log(resposta.data.imagemPerfil._id)
                const imagem = await Imagem.findById(resposta.data.imagemPerfil._id);
                await imagem.remove();
                const login = await Login.findById(resposta.data.login._id)
                await login?.remove();
                const clienteId = await cliente.findById(id)
                await clienteId?.remove()
                console.log(resposta.data.imagemPerfil._id)
                return res.status(200).send({ message: 'cliente deletado com sucesso' });
            }
        }).catch((err) => {
            console.log(err)
            res.status(500).send({ message: `${err.message} - erro ao deletar o cliente` });
        })
    }



}
export default clienteController;