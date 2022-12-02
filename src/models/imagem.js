const mongoose = require('mongoose');
require("dotenv").config();
const AWS = require("aws-sdk");
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const s3 = new AWS.S3({
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.ACCESS_KEY,
    region: process.env.REGIONAWS
})
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
            Bucket: process.env.BUCKET,
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