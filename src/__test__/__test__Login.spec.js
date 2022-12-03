const { app } = require("../app/app");
const request = require('supertest');
const { logger } = require('../logger/index');
var LoginID = String;
describe('Teste do Backend do Fullsports - Login ', () => {
    const login = request(app);
    const email = "__test__unitario@gmail.com";
    const password = "__teste__";
    it("• Deve execultar o método POST - Cadastrar Login", async()=>{
        //método POST
        const CadastrarLogin = await login.post("/login")
        .send({
            email: email,
            password: password,
            isAdmin: true
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        if(CadastrarLogin.statusCode === 200){
            expect(CadastrarLogin.statusCode).toBe(200);
           if(CadastrarLogin.body.password !== password){
            expect(CadastrarLogin.body.password !== password).toBe(true);
            LoginID = CadastrarLogin.body._id;
            logger.info("ID do Login Cadastrado: "+CadastrarLogin.body._id);
           }else{
            expect(CadastrarLogin.body.password !== password).toBe(false);
            logger.error("Erro Senha não for criptografada");
           }
        }else{
            expect(CadastrarLogin.statusCode).toBe(500)
            expect(CadastrarLogin.body).toHaveProperty('message');
            logger.error("Erro ao castrar o Login: " + CadastrarLogin.body);
        }
    })
    it("• Deve execultar o método GET - Listar todos os Logins",async()=>{
        const ConsultaLogin = await login.get("/login")
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        expect(ConsultaLogin.statusCode).toBe(200);
        if(ConsultaLogin.statusCode===200){
            logger.info("Tabela do Logins Cadastrado: ");
            logger.info(console.table(ConsultaLogin.body,["_id","email","password","isAdmin"]));
        }else{
            expect(ConsultaLogin.statusCode).toBe(500);
            expect(ConsultaLogin.body).toHaveProperty('message');
            logger.error("Erro ao Consultar os Logins: " + ConsultaLogin.body);
        }
    })
})