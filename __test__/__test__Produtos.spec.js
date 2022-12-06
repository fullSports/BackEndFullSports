const {app} = require ("../build/src/app/app");
const request = require ('supertest');
const { logger } = require ('../build/src/logger/index');

var produtoID = String;

describe("Teste do Backend do Fullsports - Rotas de Produto com As rotas de Categoria",()=>{
    const produto = request(app);
    
})