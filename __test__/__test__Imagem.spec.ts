import app from "../src/app/app";
import request from 'supertest'
import logger from "../src/logger";
import path from "path";
const Img = require("./tmp/testes-unitarios.png") ;
var ImagemID = String;

describe("Teste do Backend do Fullsports - Deve Realizar todas as Rotas de Imagem", () => {
    // const imagem = request(app);
    // it("• Deve Execultar o método POST de imagens", async () => {
    //     const CadastrarImagem = await imagem.post("/imagem")
    //     .send({
    //         file: Img
    //     }) 

    //     logger.warn("ee"+ CadastrarImagem.body)

    // })
    console.info(Img.name)
});