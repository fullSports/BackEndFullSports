import logger from '../src/logger/index';
import app from '../src/app/app';
import request from 'supertest';
import Configjest from '../src/config/Jest/index'
import {defaults} from 'jest-config';
var ClienteID = String;

describe("Teste do Backend do Fullsports - Rotas de Fornecedores", () => {
    const cliente = request(app);

    it("• DEve execultar o método GET - listar todos os clientes cadastrados", async () => {
        const ConsultarCliente = await cliente.get("/listar-clientes")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            expect(ConsultarCliente.statusCode).toBe(200);
            logger.info(ConsultarCliente.body.toString());
    })
})