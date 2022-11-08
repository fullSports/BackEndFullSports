const mongoose = require("mongoose");

const equipamentoSchema = new mongoose.Schema({
    id: {
        type: String
    },
    fornecedor:{
        type: mongoose.Schema.Types.ObjectId,ref:'fornecedores', 
        required: true
    },
    
})