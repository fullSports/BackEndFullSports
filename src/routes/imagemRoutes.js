const express = require ("express");
const routerImagem = express.Router();
const multer = require('multer')
const multerConfig = require('./../config/multer.js');
const Imagem = require('./../models/imagem.js')
routerImagem
    .get("/imagem",(req,res)=>{
        Imagem.find((err,imagens)=>{
            res.status(200).json(imagens);
        })
    })
    .post("/imagem", multer(multerConfig).single("file"), async (req, res) => {
        const { originalname: name, size, key, location: url = "" } = req.file;

        const imagemPost = await Imagem.create({
            name,
            size,
            key,
            url
        })
        res.json(imagemPost)
    })
    .delete("/imagem/:id", async(req,res)=>{
        const imagem = await Imagem.findById(req.params.id);
        await imagem.remove();
        return res.send();
    });
module.exports = routerImagem    ;