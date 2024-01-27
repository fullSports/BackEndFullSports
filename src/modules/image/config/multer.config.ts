import { S3Client } from "@aws-sdk/client-s3";
import { NotAcceptableException } from "@nestjs/common";
import { configService } from "@configs/configService";
import * as multer from "multer";
import * as path from "path";
import * as crypto from "crypto";
import * as multerS3 from "multer-s3";
import * as dotenv from "dotenv";
dotenv.config();
const s3 = new S3Client({
  region: configService.get<string>("REGIONAWS"),
  credentials: {
    accessKeyId: configService.get<string>("KEY_ID"),
    secretAccessKey: configService.get<string>("ACCESS_KEY"),
  },
});
const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(
        null,
        path.resolve(__dirname, "..", "..", "..", "..", "tmp", "uploads")
      );
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, file.filename);
        file.path = `${hash.toString("hex")}-${file.originalname}`;
        cb(null, file.path);
      });
    },
  }),
  s3: multerS3({
    s3: s3,
    bucket: configService.get<string>("BUCKET"),
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);
        const filename = `${hash.toString("hex")}-${file.originalname}`;
        cb(null, filename);
      });
    },
  }),
};

export default {
  dest: path.resolve(__dirname, "..", "..", "..", "..", "tmp", "uploads"),
  storage: storageTypes[configService.get<string>("STORAGE_TYPE")],
  limits: {
    fileSize: 10 * 1024 * 1024, // MB
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new NotAcceptableException("Tipo da imagem invalida"));
    }
  },
};
