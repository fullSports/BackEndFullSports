import cliente from "../models/cliente.js";
class clienteController{
    static listarClientes = (req, res)=>{
        cliente.find((err, cliente)=>{
            res.status(200).json(clientes)
        })
    }
}
export default clienteController