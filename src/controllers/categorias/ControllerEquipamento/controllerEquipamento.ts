import {equipamento} from "../../../models/categorias/Equipamento/equipamento";
const Imagem = require("../../../models/imagem.model.js");
import {Request,Response} from "express";
import api from "../../../config/api/api";
export class equipamentoController {
    static listarequipamento = (req:Request, res:Response) => {
        equipamento.find()
            .populate('fornecedor')
            .populate('imagemProduto')
            .exec((err, equipamentos) => {
                res.status(200).json(equipamentos);
            });
    }
    static cadastrarequipamento = (req:Request, res:Response) => {
        let equipamentos = new equipamento(req.body);
        equipamentos.save((err) => {
            if (err) {
                res.status(500).send(({ message: `${err.message} - falha ao cadastrar o equipamento` }));
            } else {
                res.status(200).send(equipamentos.toJSON())
            };
        });

    }
    static atualizarequipamento = (req:Request, res:Response) => {
        const id = req.params.id;

        equipamento.findByIdAndUpdate(id, { $set: req.body }, (err:Error) => {
            if (!err) {
                res.status(200).send({ message: 'equipamento atualizado com sucesso' });
            } else {
                res.status(500).send({ message: `Erro ao cadastrar o equipamento - ${err.message}` });
            };
        });
    }
    static listarequipamentoId = (req:Request, res:Response) => {
        const id = req.params.id;
        equipamento.findById(id)
            .populate('fornecedor')
            .populate('imagemProduto')
            .exec((err, equipamentos) => {
                if (err) {
                    res.status(400).send({ menssage: `${err.message} - id do equipamento não encotrado` });
                } else {
                    res.status(200).send(equipamentos);
                }
            })
    }
    static excluirEquipamentoEimagem = (req:Request, res:Response) => {
        const id = req.params.id;
        api.request({
            method: "GET",
            url:`${process.env.APP_URL}/listar-equipamento/${id}`
        }).then(resposta=>{

            if (resposta.status === 200) {

                if(resposta.data.imagemProduto === null){
                    equipamento.findByIdAndDelete(id, (err:Error) => {
                        if (!err) {
                            res.status(200).send({ message: 'equipamento  deletado com sucesso1' });
                        } else {
                            res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
                        }
                    });
                }else{
                    equipamento.findById(id,async (err:Error) => {
                        if (!err) {
                            resposta.data.imagemProduto.map(async (item:any)=>{
                            const imagem = await Imagem.findById(item._id);
                            await imagem.remove();
                            })
                            const equipamentoDelete = await equipamento.findById(id)
                            equipamentoDelete?.remove()
                            res.status(200).send({ message: 'equipamento deletado com sucesso-' });
                        } else {
                            res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
                        }
                    });
                }
            }
        })

    }
    static excluirEquipamento = (req:Request,res:Response) =>{
        const id = req.params.id;
        equipamento.findByIdAndDelete(id, (err:Error) => {
            if (!err) {
                res.status(200).send({ message: 'equipamento  deletado com sucesso1' });
            } else {
                res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
            }
        });
    }
}