const mongoose = require("mongoose");
require("dotenv").config();
const AWS = require("aws-sdk");
import fs from "fs";
import { Schema,Prop,SchemaFactory } from "@nestjs/mongoose";
import path from "path";
import { promisify } from "util";
import { HydratedDocument } from "mongoose";

const s3 = new AWS.S3({
  accessKeyId: process.env.KEY_ID,
  secretAccessKey: process.env.ACCESS_KEY,
  region: process.env.REGIONAWS,
});
export type ImagemDocument = HydratedDocument<Imagem>;
@Schema()
export class Imagem {
  name: String;
  size: Number;
  key: String;
  url: String;
  createAt: {
    type: Date;
    default: Date;
  }
}
export const ImagemSchema = SchemaFactory.createForClass(Imagem);
ImagemSchema.pre("save", function () {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`;
  }
});
ImagemSchema.remove(function () {
  if (process.env.STORAGE_TYPE === "s3") {
    return s3
      .deleteObject({
        Bucket: process.env.BUCKET,
        Key: this.key,
      })
      .promise();
  } else {
    return promisify(fs.unlink)(
      path.resolve(__dirname, "..", "..", "tmp", "uploads", this.key)
    );
  }
});