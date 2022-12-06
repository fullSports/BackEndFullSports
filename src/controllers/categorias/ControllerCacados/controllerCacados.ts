import calcado from "../../../models/categorias/Calcados/calcado"
const Imagem = require("../../../models/imagem.model.js");
import {Request,Response} from 'express';
import api from "../../../config/api/api";
class calcadoController {
    static listarcalcado = (req:Request, res:Response) => {
        calcado.find()
            .populate('fornecedor')
            .populate('imagemProduto')
            .exec((err, calcados) => {
                res.status(200).json(calcados);
            });
    }
    static cadastrarcalcado = (req:Request, res:Response) => {
        let calcados = new calcado(req.body);
        calcados.save((err) => {
            if (err) {
                res.status(500).send(({ message: `${err.message} - falha ao cadastrar o calcado` }));
            } else {
                res.status(200).send(calcados.toJSON())
            };
        });

    }
    static atualizarcalcado = (req:Request, res:Response) => {
        const id = req.params.id;

        calcado.findByIdAndUpdate(id, { $set: req.body }, (err:Error) => {
            if (!err) {
                res.status(200).send({ message: 'calcado atualizado com sucesso' });
            } else {
                res.status(500).send({ message: `Erro ao cadastrar o calcado - ${err.message}` });
            };
        });
    }
    static listarcalcadoId = (req:Request, res:Response) => {
        const id = req.params.id;
        calcado.findById(id)
            .populate('fornecedor')
            .populate('imagemProduto')
            .exec((err, calcados) => {
                if (err) {
                    res.status(400).send({ menssage: `${err.message} - id do calcado não encotrado` });
                } else {
                    res.status(200).send(calcados);
                }
            })
    }
    static excluirCalcadoEimagem = (req:Request, res:Response) => {
        const id = req.params.id;

        let url = process.env.APP_URL + "/listar-calcado/" + id;
        console.log(url)
        var XMLHttpRequest = require('xhr2');
        let req1 = new XMLHttpRequest();
        req1.open("GET", url)
        req1.send();

        api.request({
            method:"GET",
            url:`${process.env.APP_URL}/listar-calcado/${id}/`
        }).then(reposta=>{
            if (reposta.status === 200) {
                if(reposta.data.imagemProduto === null){
                    calcado.findByIdAndDelete(id, (err:Error) => {
                        if (!err) {
                            res.status(200).send({ message: 'calcado  deletado com sucesso1' });
                        } else {
                            res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
                        }
                    });
                }else{
                    calcado.findById(id,async (err:Error) => {
                        if (!err) {
                            reposta.data.imagemProduto.map(async (item: any) =>{
                            const imagem = await Imagem.findById(item._id);
                            await imagem.remove();
                            })
                            const calcadoDelete = await calcado.findById(id)
                            calcadoDelete?.remove()
                            res.status(200).send({ message: 'calcado deletado com sucesso-' });
                        } else {
                            res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
                        }
                    });
                }
            }
        })
    }
    static ExcluirCalcado =(req:Request,res:Response) =>{
        const id = req.params.id;
        calcado.findByIdAndDelete(id, (err:Error) => {
            if (!err) {
                res.status(200).send({ message: 'calcado  deletado com sucesso1' });
            } else {
                res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
            }
        });
    }
}
export default calcadoController;