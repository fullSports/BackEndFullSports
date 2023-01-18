
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose"
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
export type ImageDocument = HydratedDocument<Image>;
@Schema()
export class Image {
    name: String;
    size: Number;
    key: String;
    url: String;
    createAt: {
        type: Date;
        default: Date;
    }
}
export const ImageSchema = SchemaFactory.createForClass(Image);
ImageSchema.pre('save',function(){
    if(!this.url) {
         this.url=`${process.env.APP_URL}/files/${this.key}`;
    }
 });
 ImageSchema.pre('remove',function(){
     if(process.env.STORAGE_TYPE === 's3'){
         return s3.deleteObject({
             Bucket: process.env.BUCKET,
             Key: Image.prototype.key
         }).promise()
     }else{
         return promisify(
         fs.unlink)(path.resolve(__dirname,"..","..","tmp","uploads",Image.prototype.key)
         );
     };
 });