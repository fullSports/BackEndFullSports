const express = require ("express");
const routerImagem = express.Router();
const multer = require('multer');
const imagemController = require("../controllers/imagem.controller.js");
const multerConfig = require('../config/multer.config.js');
routerImagem
    .get("/imagem",imagemController.listarImagem)
    .post("/imagem", multer(multerConfig).single('file'), imagemController.cadastrarImagem)
    .delete("/imagem/:id", imagemController.deletarImagem)
    .get("/imagem/:id", imagemController.listarImagemId)
module.exports = routerImagem ;