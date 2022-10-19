import mongoose from "mongoose";
const clienteSchema = new mongoose.Schema(
    {
        id:{type:String}, 
        cpf:{type:String},
        nome:{type:String},
        dataNascimento:{type:Date},
        sexo:{type:String},
        cep:{type:String},
        endereco:{type:String}
    }
)
const cliente = mongoose.model("cliente",clienteSchema)
export default cliente