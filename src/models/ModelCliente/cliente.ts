import mongoose from "mongoose";
const clienteSchema = new mongoose.Schema(
    {
        cpf: {
            type: String,
            required: true
        },
        nome: {
            type: String,
            required: true
        },
        login:{
            type: mongoose.Schema.Types.ObjectId,ref: 'login',
            required: true
        },
        dataNascimento: {
            type: String,
            required: true
        },
        sexo: {
            type: String,
            required: true
        },
        cep: {
            type: String,
            required: true
        },
        endereco: {
            type: String,
            required: true
        },
        dataCadastro: {
            type: String,
            required: true
        },
         imagemPerfil:{
         type: mongoose.Schema.Types.ObjectId,ref: 'imagem'
     },
    });

const cliente = mongoose.model("clientes", clienteSchema);
export default cliente;
