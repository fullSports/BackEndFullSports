import { assert } from "console";

const { app } = require("../src/app/app")
const request = require('supertest');
const { logger } = require('../src/logger/index');
describe('Teste do Backend do Fullsports ', () => {
    jest.setTimeout(2000)
    var produto = [{ _id: "e" }];
    it('- Deve execultar a rota principal', async () => {
        const res = await request(app).get('/');
        logger.info(res.body)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('status')
    })
    describe('•  Deve execultar as Rotas de Imagem:', () => {
        it('• Método de consultar todas as imagens;', async () => {
            await request(app)
                .get("/imagem")
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)

        })
        it('• Método de consultar uma unica imagen atraves do id;', async () => {
            const imagens = await request(app).get('/imagem');
            request(app)
                .get(`/imagem/${imagens.body?.[0]._id}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
        })
        // it('• Método de cadastrar uma imagem', async () => {

        // })
        // it('• Método de deletar uma imagem', async () => {

        // })
    })
    describe('• Deve execultar as Rotas do Fornecedor', () => {
        const fornecedor = request(app)
        it('• Deve execultar o método post de Fornecedor', async () => {
            return await fornecedor.post('/cadastrar-fornecedor')
                .send({
                    cnpj: "36.075.027/0001-90",
                    nomeEmpresa: "Empresa_test_unitario",
                    cep: "15997-159",
                    endereco: "Rua joão",
                    dataCadastro: new Date().toLocaleDateString().toString()
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then((reposta: Response) => {
                    logger.info(reposta.json)   
                }).catch(() => {
                    logger.error('Erro no cadastro de fornecedor')
                })
        })
    })
    // describe('•  Deve execultar todas as rotas de Produto:', () => {

    //     it('• Método de consultar todos os produtos', async () => {
    //         await request(app)
    //             .get("/listar-produtos")
    //             .set('Accept', 'application/json')
    //             .expect('Content-Type', /json/)
    //             .expect(200)
    //     })
    //    describe('• Médotos de cadastro de Produto com categoria',()=>{
    //         it('• Cadastro de Calçados',async () =>{
    //             const Cacado = request(app).post("/cadastrar-calcado")
    //         })
    //    })

    // })
})