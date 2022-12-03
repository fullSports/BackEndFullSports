import suplemento from "../../../models/categorias/Suplemento/suplemento";
const Imagem = require("../../../models/imagem.js");
import {Request,Response} from "express"
import api from "../../../config/api/api";
class suplementoController {
    static listarsuplementos = (req:Request, res:Response) => {
        suplemento.find()
            .populate('fornecedor')
            .populate('imagemProduto')
            .exec((err, suplementos) => {
                res.status(200).json(suplementos);
            });
    }
    static cadastrarsuplemento = (req:Request, res:Response) => {
        let suplementos = new suplemento(req.body);
        suplementos.save((err) => {
            if (err) {
                res.status(500).send(({ message: `${err.message} - falha ao cadastrar o suplemento` }));
            } else {
                res.status(200).send(suplementos.toJSON())
            };
        });

    }
    static atualizarsuplemento = (req:Request, res:Response) => {
        const id = req.params.id;

        suplemento.findByIdAndUpdate(id, { $set: req.body }, (err:Error) => {
            if (!err) {
                res.status(200).send({ message: 'suplemento atualizado com sucesso' });
            } else {
                res.status(500).send({ message: `Erro ao cadastrar o suplemento - ${err.message}` });
            };
        });
    }
    static listarsuplementoId = (req:Request, res:Response) => {
        const id = req.params.id;
        suplemento.findById(id)
            .populate('fornecedor')
            .populate('imagemProduto')
            .exec((err, suplementos) => {
                if (err) {
                    res.status(400).send({ menssage: `${err.message} - id do suplemento não encotrado` });
                } else {
                    res.status(200).send(suplementos);
                }
            })
    }
    static excluirsuplementoEimagem = (req:Request, res:Response) => {
        const id = req.params.id;
        api.request({
            method:"GET",
            url:`${process.env.APP_URL}/listar-suplemento/${id}`
        }).then(resposta=>{
            if (resposta.status === 200) {

                if(resposta.data.imagemProduto === null){
                    suplemento.findByIdAndDelete(id, (err:Error) => {
                        if (!err) {
                            res.status(200).send({ message: 'suplemento  deletado com sucesso1' });
                        } else {
                            res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
                        }
                    });
                }else{
                    suplemento.findById(id,async (err:Error) => {
                        if (!err) {
                            resposta.data.imagemProduto.map(async (item:any)=>{
                            const imagem = await Imagem.findById(item._id);
                            await imagem.remove();
                            })
                            const suplementoDelete = await suplemento.findById(id)
                            suplementoDelete?.remove()
                            res.status(200).send({ message: 'suplemento deletado com sucesso-' });
                        } else {
                            res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
                        }
                    });
                }
            }
        })

    }
    static excluirsuplemento = (req:Request,res:Response) =>{
        const id = req.params.id;
        suplemento.findByIdAndDelete(id, (err:Error) => {
            if (!err) {
                res.status(200).send({ message: 'suplemento  deletado com sucesso1' });
            } else {
                res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
            }
        });
    }
}
export default suplementoController;