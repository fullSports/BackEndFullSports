const express = require ("express");
const clienteController = require ("../controllers/clienteController.js");
const routerCliente = express.Router();
const multer = require('multer')
const multerConfig = require('./../config/multer.js');
const Cliente =  require("./../models/imagem.js")
routerCliente
    .get("/listar-clientes", clienteController.listarClientes)
    .get("/listar-cliente/:id", clienteController.listarClienteId)
    .post("/cadastrar-cliente",multer(multerConfig).single("file"),async (req, res)=>{
        const { originalname: name, size, key, location: url = "" } = req.file;
        const { cpf, nome, dataNascimento, sexo, cep,endereco,dataCadastro} = req.body;
        const imagemPost = await Cliente.create({
            cpf,
            nome,
            dataNascimento,
            sexo,
            cep,
            endereco,
            dataCadastro,
            imagePerfil:{
                name,
                size,
                key,
                url
            }
        });
        res.json(imagemPost);
    })
    .put("/atualizar-cliente/:id", clienteController.atualizarCliente)
    .delete("/deletar-cliente/:id",clienteController.excluirCliente)
module.exports = routerCliente    ;