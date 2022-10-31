const mongoose = require ("mongoose");
const fornecedorSchema = new mongoose.Schema(
    {
        id:{
            type:String
        },
        cnpj:{
            type:String,
            require: true  
        },
        nomeEmpresa:{
            type:String,
            require: true  
        },
        cep:{
          type: String,
          require: true  
        },
        endereco:{
            type:String,
            require: true  
        },
        dataCadastro:{
            type:String,
            require: true  
        }
    }
)
const fornecedor = mongoose.model("fornecedores",fornecedorSchema);
module.exports = fornecedor;