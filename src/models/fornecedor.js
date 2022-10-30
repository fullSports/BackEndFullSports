const mongoose = require ("mongoose");
const fornecedorSchema = new mongoose.Schema(
    {
        id:{
            type:String
        },
        cnpj:{
            type:String,
            require
        },
        nomeEmpresa:{
            type:String,
            require
        },
        endereco:{
            type:String,
            require
        },
        dataCadastro:{
            type:String,
            require
        }
    }
)
const fornecedor = mongoose.model("fornecedores",fornecedorSchema);
module.exports = fornecedor;