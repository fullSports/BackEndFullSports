const {app} = require("../app/app");
const request = require('supertest');
describe('Teste do  app ',()=>{
    it('deve execultar a rota principal', async ()=>{
        const res =  await request(app).get('/');
        console.log(res.body)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('status')
    })
})