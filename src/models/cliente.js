const mongoose = require("mongoose");
require("dotenv").config();
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const ImagemSchema = require("./imagem.js")
const  s3 = new aws.S3();

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
        type: mongoose.Schema.Types.ObjectId,ref: 'imagem', 
        required: true
    },
    });
// clienteSchema.pre('save',function(){
//     if(!this.imagems.url) {
//          this.imagems.url=`${process.env.APP_URL}/files/${this.imagems.key}`;
//     }
//  });
//  clienteSchema.pre('remove',function(){
//     if(process.env.STORAGE_TYPE === 's3'){
//         return s3.deleteObject({
//             Bucket: 'upload-image-fullsports',
//             key: this.imagems.key
//         }).promise()
//     }else{
//         return promisify(
//         fs.unlink)(path.resolve(__dirname,"..","..","tmp","uploads",this.imagems.key)
//         );
//     }
// });

const cliente = mongoose.model("clientes", clienteSchema);
module.exports = cliente;