import app from "../src/app/app";
import request from 'supertest'
import logger from "../src/logger";
it('- Deve execultar a rota principal', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('status')
    logger.info(res.body)
})