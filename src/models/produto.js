const  mongoose = require ("mongoose");
const produtoSchema = new mongoose.Schema(
    {
        id:{
            type:String
        },       
        nomeProduto:{
            type: String,
            require: true
        },
        // tipoProduto:{
        //     type:String, 
        //     required:true
        // },
        // corProduto:{
        //     type:String, 
        //     required:true
        // },
        // preco:{
        //     type:String,
        //     required:true
        // }, 
        // quantidade:{
        //     type:Number, 
        //     required:true
        // },
        // dataCadastro:{
        //     type: String,
        //     required:true
        // },
        // fornecedor:{
        //     type: mongoose.Schema.Types.ObjectId,ref:'fornecedores', 
        //     required: true
        // },
        imagemProduto: {
            type: Array,
            required: true
        }
    });
const produto = mongoose.model("produtos",produtoSchema);
module.exports=produto;