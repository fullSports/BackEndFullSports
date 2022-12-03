const { app } = require("../app/app")
const request = require('supertest');
const { logger } = require('../logger/index');
it('- Deve execultar a rota principal', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('status')
    logger.info(res.body)
})