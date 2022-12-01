const mongoose = require('mongoose');
require("dotenv").config();
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const  s3 = new aws.S3();

const ImagemSchema = new mongoose.Schema({
    name: String,
    size: Number,
    key: String,
    url: String,
    createAt: {
        type: Date,
        default: Date.now,
    }
});
ImagemSchema.pre('save',function(){
   if(!this.url) {
        this.url=`${process.env.APP_URL}/files/${this.key}`;
   }
});
ImagemSchema.pre('remove',function(){
    if(process.env.STORAGE_TYPE === 's3'){
        return s3.deleteObject({
            Bucket: process.env.BUCKET_AWS,
            Key: this.key
        }).promise()
    }else{
        return promisify(
        fs.unlink)(path.resolve(__dirname,"..","..","..","tmp","uploads",this.key)
        );
    }
});
const imagem = mongoose.model("imagem", ImagemSchema);
module.exports = imagem
