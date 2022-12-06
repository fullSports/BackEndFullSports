import fornecedor from "../../models/ModelFornecedor/fornecedor"
import {Request,Response} from "express"
class fornecedorController {
    static listarFornecedor = (req:Request, res:Response) => {
        fornecedor.find((err, fornecedor) => {
            res.status(200).json(fornecedor)
        })
    }
    static cadastrarFornecedor = async (req:Request, res:Response) => {
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
    static atualizarfornecedor = (req:Request, res:Response) => {
        const id = req.params.id;

        fornecedor.findByIdAndUpdate(id, { $set: req.body }, (err:Error) => {
            if (!err) {
                res.status(200).send({ message: 'fornecedor atualizado com sucesso' });
            } else {
                res.status(500).send({ message: `Erro ao cadastrar o fornecedor - ${err.message}` });
            };
        });
    }
    static listarFornecedorId = (req:Request, res:Response) => {
        const id = req.params.id;

        fornecedor.findById(id, (err: Error, fornecedor:Response) => {
            if (err) {
                res.status(400).send({ menssage: `${err.message} - id do fornecedor não encotrado` });
            } else {
                res.status(200).send(fornecedor);
            }
        })
    }
    static excluirFornecedor = (req:Request, res:Response) => {
        const id = req.params.id;
        fornecedor.findByIdAndDelete(id, (err: Error) => {
            if (!err) {
                res.status(200).send({ message: 'fornecedor deletado com sucesso' });
            } else {
                res.status(500).send({ message: `${err.message} - erro ao excluir o fornecedor` });
            }
        });
    }
}
export default fornecedorController;