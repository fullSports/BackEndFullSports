const { app } = require("../build/src/app/app");
const request = require('supertest');
const { logger } = require('../build/src/logger/index');
const Img = require("./tmp/testes-unitarios.png");
var ImagemID = String;

const ImgMock = jest.mock("./tmp/testes-unitarios.png")
describe("Teste do Backend do Fullsports - Deve Realizar todas as Rotas de Imagem", () => {
    const imagem = request(app);
    it("• Deve Execultar o método POST de imagens", async () => {
        const CadastrarImagem = await imagem.post("/imagem")
        .send({
            file: ImgMock
        }) 
        .set('Accept', 'multipart/form-data')
        .expect('Content-Type', 'multipart/form-data')

        logger.warn("ee"+ CadastrarImagem.body)
    })
});