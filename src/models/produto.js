const  mongoose = require ("mongoose");
const produtoSchema = new mongoose.Schema(
    {
        id:{
            type:String
        },
        cnpj:{
            type:mongoose.Schema.Type.ObjectId,ref:'fornecedor', 
            required:true},
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
            required: true,
            trim: true
        }

    });
const produto = mongoose.model("prodoto",produtoSchema);
module.exports=produto;