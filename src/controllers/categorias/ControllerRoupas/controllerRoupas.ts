import roupa from "../../../models/categorias/Roupa/roupa";
const Imagem = require("../../../models/imagem.js");
import { Request, Response } from "express";
import api from "../../../config/api/api";
class roupaController {
    static listarRoupas = (req: Request, res: Response) => {
        roupa.find()
            .populate('fornecedor')
            .populate('imagemProduto')
            .exec((err, roupas) => {
                res.status(200).json(roupas);
            });
    }
    static cadastrarRoupa = (req: Request, res: Response) => {
        let roupas = new roupa(req.body);
        roupas.save((err) => {
            if (err) {
                res.status(500).send(({ message: `${err.message} - falha ao cadastrar o roupa` }));
            } else {
                res.status(200).send(roupas.toJSON())
            };
        });

    }
    static atualizarRoupa = (req: Request, res: Response) => {
        const id = req.params.id;

        roupa.findByIdAndUpdate(id, { $set: req.body }, (err:Error) => {
            if (!err) {
                res.status(200).send({ message: 'roupa atualizado com sucesso' });
            } else {
                res.status(500).send({ message: `Erro ao cadastrar o roupa - ${err.message}` });
            };
        });
    }
    static listarRoupaId = (req: Request, res: Response) => {
        const id = req.params.id;
        roupa.findById(id)
            .populate('fornecedor')
            .populate('imagemProduto')
            .exec((err, roupas) => {
                if (err) {
                    res.status(400).send({ menssage: `${err.message} - id do roupa não encotrado` });
                } else {
                    res.status(200).send(roupas);
                }
            })
    }
    static excluirRoupaEimagem = (req: Request, res: Response) => {
        const id = req.params.id;

        api.request({
            method: "GET",
            url: `${process.env.APP_URL}/listar-roupa/${id}`
        }).then(resposta => {
            if (resposta.status === 200) {
                if (resposta.data.imagemProduto === null) {
                    roupa.findByIdAndDelete(id, (err:Error) => {
                        if (!err) {
                            res.status(200).send({ message: 'roupa  deletado com sucesso1' });
                        } else {
                            res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
                        }
                    });
                } else {
                    roupa.findById(id, async (err:Error) => {
                        if (!err) {
                            resposta.data.imagemProduto.map(async (item:any) => {
                                const imagem = await Imagem.findById(item._id);
                                await imagem.remove();
                            })
                            const roupaDelete = await roupa.findById(id)
                            roupaDelete?.remove()
                            res.status(200).send({ message: 'roupa deletado com sucesso-' });
                        } else {
                            res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
                        }
                    });
                }
            }
        })
    }
    static excluirRoupa = (req:Request, res:Response) => {
        const id = req.params.id;
        roupa.findByIdAndDelete(id, (err:Error) => {
            if (!err) {
                res.status(200).send({ message: 'roupa  deletado com sucesso1' });
            } else {
                res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
            }
        });
    }
}
export default roupaController;