const  mongoose = require ("mongoose");
const fornecedorModel = require('./../models/fornecedor.js')
const produtoSchema = new mongoose.Schema(
    {
        id:{
            type:String
        },
        cnpj:{
            type: mongoose.Schema.Types.ObjectId,ref: 'fornecedor',
            required:true
        },
        nomeProduto:{
            type:String, 
            required:true
        },
        tipoProduto:{
            type:String, 
            required:true
        },
        corProduto:{
            type:String, 
            required:true
        },
        preco:{
            type:String,
            required:true
        }, 
        quantidade:{
            type:Number, 
            required:true
        },
        dataCadastro:{
            type: String,
            required:true
        },
        imagemProduto:{
            type: String,
            trim: true
        }

    });
const produto = mongoose.model("prodoto",produtoSchema);
module.exports=produto;