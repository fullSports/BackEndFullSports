const mongoose = require ("mongoose");
const clienteSchema = new mongoose.Schema(
    {
        id:{
            type:String
        }, 
        cpf:{
            type:String,
            required: true
        },
        nome:{
            type:String,
            required: true
        },
        dataNascimento:{
            type: String,
            required: true
        },
        sexo:{
            type:String,
            required: true
        },
        cep:{
            type:String,
            required: true
        },
        endereco:{
            type:String,
            required: true
        },
        dataCadastro:{
            type: String,
            required: true
        },
        imagePerfil: {
            type: String,
            required: true,
            trim: true
        }
    });
const cliente = mongoose.model("cliente",clienteSchema);
module.exports = cliente;