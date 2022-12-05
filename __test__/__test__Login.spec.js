const { app } = require ("../build/src/app/app");
const request = require ('supertest');
const { logger } = require ('../build/src/logger/index');
var LoginID = String;
var passwordHash = String;
describe('Teste do Backend do Fullsports - Login ', () => {
    const login = request(app);
    const email = "__test__unitario@gmail.com";
    const password = "__teste__";
    jest.setTimeout(7000);
    const newEmail = "__teste__unitaritoPUT@.com"
    const newPassword = "__teste__put"
    it("• Deve execultar o método POST - Cadastrar Login", async () => {
        //método POST
        const CadastrarLogin = await login.post("/login")
            .send({
                email: email,
                password: password,
                isAdmin: true
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        if (CadastrarLogin.statusCode === 200) {
            expect(CadastrarLogin.statusCode).toBe(200);
            if (CadastrarLogin.body.password !== password) {
                expect(CadastrarLogin.body.password !== password).toBe(true);
                LoginID = CadastrarLogin.body._id;
                logger.info("ID do Login Cadastrado: " + CadastrarLogin.body._id);
            } else {
                expect(CadastrarLogin.body.password !== password).toBe(false);
                logger.error("Erro Senha não for criptografada");
            }
        } else {
            expect(CadastrarLogin.statusCode).toBe(500)
            expect(CadastrarLogin.body).toHaveProperty('message');
            logger.error("Erro ao castrar o Login: " + CadastrarLogin.body);
        }
    })
    it("• Deve execultar o método GET - Listar todos os Logins", async () => {
        const ConsultaLogin = await login.get("/login")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        expect(ConsultaLogin.statusCode).toBe(200);
        if (ConsultaLogin.statusCode === 200) {
            logger.info("Tabela do Logins Cadastrado: ");
            logger.info(console.table(ConsultaLogin.body, ["_id", "email", "password", "isAdmin"]));
        } else {
            expect(ConsultaLogin.statusCode).toBe(500);
            expect(ConsultaLogin.body).toHaveProperty('message');
            logger.error("Erro ao Consultar os Logins: " + ConsultaLogin.body);
        }
    })
    it("• Deve Execultar o método GET - Listar Login por ID", async () => {
        const ConsultaLogin = await login.get(`/login/${LoginID}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        expect(ConsultaLogin.statusCode).toBe(200);
        if (ConsultaLogin.statusCode === 200) {
            passwordHash = ConsultaLogin.body.password;
            logger.info("Tabela do Login pesquisado pelo ID: ");
            logger.info(console.table(ConsultaLogin.body));
        } else {
            expect(ConsultaLogin.statusCode).toBe(500);
            expect(ConsultaLogin.body).toHaveProperty('message');
            logger.error("Erro ao Consultar o Login: " + ConsultaLogin.body);
        }
    })
    it("• Deve Execultar o método PUT - Login + Senha", async () => {
        const PutLogin = await login.put(`/login/${LoginID}`)
            .send({
                email: newEmail,
                password: newPassword,
                isAdmin: false
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        expect(PutLogin.body).toHaveProperty('message');
        if (PutLogin.statusCode === 200) {
            expect(PutLogin.statusCode).toBe(200);
            logger.info("Atualizou o login:" + true);
            logger.info("Novos Valores:");
            const ConsultaLoginPUT = await login.get(`/login/${LoginID}`);
            logger.info(console.table(ConsultaLoginPUT.body));
            expect(ConsultaLoginPUT.body.password !== passwordHash).toBe(true)
        } else {
            expect(PutLogin.statusCode).toBe(400);
            logger.info("Atualizar Login: " + false)
            logger.error("Erro ao atualizar o login: " + PutLogin.body)
        }
    })
    it("• Deve execultar o método POST- Realizar o Login com email e senha Correta", async () => {
        const RealizaLogin = await login.post("/realizar-login")
            .send({
                email: newEmail,
                password: newPassword
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        expect(RealizaLogin.statusCode).toBe(200);
        if (RealizaLogin.statusCode === 200) {
            expect(RealizaLogin.body).toHaveProperty('result');
            logger.info("Tabela Dados ao Realizar o Login: ");
            expect(RealizaLogin.body.result.email === newEmail).toBe(true)
            logger.info(console.table(RealizaLogin.body.result));
        } else {
            expect(RealizaLogin.statusCode).toBe(500);
            expect(RealizaLogin.body).toHaveProperty('message');
            logger.error("Erro a oo realizar o login: " + RealizaLogin.body)
        }
    })
    it("• Deve execultar o método POST - Realizar o Login com enail ou senha incorreta", async () => {
        const RealizarLoginS = await login.post("/realizar-login")
        .send({
            email: newEmail,
            password: 'ww'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
    expect(RealizarLoginS.statusCode).toBe(200);
    expect(RealizarLoginS.body).toHaveProperty('message');

    if (RealizarLoginS.statusCode === 200) {
        logger.info(RealizarLoginS.body)
    } else {
        expect(RealizarLoginS.statusCode).toBe(500);
        logger.error("Erro a oo realizar o login: " + RealizarLoginS.body)
    }
    });
    it("• Deve execultar o método POST - pesquisar o email cadastrado",async()=>{
        const PesquisaEmail = await login.post("/pesquisar-email")
        .send({
            email: newEmail
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        expect(PesquisaEmail.statusCode).toBe(200)
        expect(PesquisaEmail.body.emailExiste).toBe(true)
    })
    it("• Deve execultar o método POST - pesquisar o email não cadastrado",async()=>{
        const PesquisaEmail = await login.post("/pesquisar-email")
        .send({
            email: "eeeddsaffsdadasdetfsafdsaeoe@gmail.com"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        expect(PesquisaEmail.statusCode).toBe(200)
        expect(PesquisaEmail.body.emailExiste).toBe(false)
    })
    it("• Deve execultar o método DELETE -ID do Login cadastrado", async () => {
        const ExcluirLogin = await login.delete(`/login/${LoginID}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        expect(ExcluirLogin.statusCode).toBe(200)
        if (ExcluirLogin.statusCode === 200) {
            logger.info("Fornecedor Deletado: " + false);
            logger.info(ExcluirLogin.body)
        } else {
            expect(ExcluirLogin.statusCode).toBe(500);
            logger.error("Erro ao deletar o fornecedor: " + ExcluirLogin.body)
        }
    })
})