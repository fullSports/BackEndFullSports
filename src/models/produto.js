import mongoose from "mongoose";
const produtoSchema = new mongoose.Schema(
    {
        id:{type:String},
        cnpj:{type:mongoose.Schema.Type.ObjectId,ref:'fornecedor', required:true},
        nomeProduto:{type:String, required:true},
        tipoProduto:{type:String, required:true},
        corProduto:{type:String, required:true},
        preco:{type:String, required:true}, 
        quantidade:{type:Number, required:true},
        dataCadastro:{type:Date},
        fotoProduto:{type:File}

    }
)
const produto = mongoose.model("prodoto",produtoSchema)
export default produto