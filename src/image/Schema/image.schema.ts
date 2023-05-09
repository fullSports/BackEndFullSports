import { HydratedDocument } from "mongoose";
export type ImageDocument = HydratedDocument<typeof ImagemSchema>;
const mongoose = require("mongoose");
import * as env from "dotenv";
env.config();
import { S3 } from "@aws-sdk/client-s3";
const fs = require("fs");
const path = require("path");
import { Logger } from "@nestjs/common";
const { promisify } = require("util");
const unlink = promisify(fs.unlink);
const s3 = new S3({
  credentials: {
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.ACCESS_KEY,
  },
  region: process.env.REGIONAWS,
});
export const ImagemSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  createAt: {
    type: Date,
    default: Date.now,
  },
});
ImagemSchema.pre("save", function () {
  if (!this.url) {
    this.url = `http://localhost:${process.env.PORT}/files/${this.key}`;
  }
});
ImagemSchema.pre("remove", async function () {
  Logger.debug(this.key);
  if (process.env.STORAGE_TYPE === "s3") {
    return s3.deleteObject({
      Bucket: process.env.BUCKET,
      Key: this.key,
    });
  } else {
    try {
      fs.rm(
        path.resolve(__dirname, "..", "..", "..", "tmp", "uploads", this.key),
        { recursive: true },
        (err) => {
          if (err) {
            return false;
          }
          return true;
        }
      );
    } catch (e) {
      Logger.error(e);
      return false;
    }
  }
});
export const imagem = mongoose.model("imagem", ImagemSchema);
export class ImagesList {
  name: string;
  size: number;
  key: string;
  url: string;
  createAt: unknown;
}
