const  mongoose = require ("mongoose");
const produtoSchema = new mongoose.Schema(
    {
        id:{
            type:String
        },
        cnpj:{type: mongoose.Schema.Types.ObjectId,ref: 'fornecedores', required: true},
          
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

    });
const produto = mongoose.model("produtos",produtoSchema);
module.exports=produto;