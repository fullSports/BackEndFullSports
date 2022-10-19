import cliente from "../models/cliente.js";
class clienteController{
    static listarClientes = (req, res)=>{
        cliente.find((err, cliente)=>{
            res.status(200).json(cliente)
        })
    }
    static cadastrarCliente = (req, res)=>{
        let clientes = new cliente(req.body);
        clientes.save((err)=>{ 
            if(err){
                res.status(500).send(({message: `${err.message} - falha ao cadastrar o cliente`}));
            }else{
                res.status(200).send(clientes.toJSON());
            };
        });
    }
    static atualizarCliente = (req,res)=>{
        const id = req.params.id;

        cliente.findByIdAndUpdate(id, {$set: req.body}, (err)=>{
            if(!err){
                res.status(200).send({message: 'Cliente atualizado com sucesso'});
            }else{
                res.status(200).sed({message: `Erro ao cadastrar o cliente - ${err.message}`});
            };
        });
    }
    static listarClienteId = (req, res)=>{
        const id = req.params.id;

        cliente.findById(id).populate('cliente').exec((err,cliente)=>{
            if(err){
                res.status(400).send({message: `${err.message} - id do cliente não localizado`});
            }else{
                res.status(200).send(cliente);
            };
        });
    }
    static excluirCliente = (req, res)=>{
        const id = req.params.id;
        cliente.findByIdAndDelete(id,(err)=>{
            if(!err){
                res.status(200).send({message: 'Cliente deletado com sucesso'});
            }else{
                res.status(500).send({message: `${err.message} - erro ao excluir o cliente`});
            }
        });
    }
}
export default clienteController