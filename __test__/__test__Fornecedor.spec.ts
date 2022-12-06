import app from "../src/app/app";
import request from 'supertest'
import logger from "../src/logger";
var FornededorID = String;
describe('Teste do Backend do Fullsports - Rotas de Fornecedores ', () => {
    const fornecedor = request(app)
    const CNPJ = '58.144.984/0001-64';
    const newCNPJ = '40.162.358/0001-35'
    jest.setTimeout(7000);
    it('• Deve execultar o método POST - Fornecedor', async () => {
        //método POST
        const CadastraFornecedor = await fornecedor.post('/cadastrar-fornecedor')
            .send({
                cnpj: CNPJ,
                nomeEmpresa: "Empresa_test_unitario",
                cep: "15997-159",
                endereco: "Rua joão",
                dataCadastro: new Date().toLocaleDateString().toString()
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        expect(CadastraFornecedor.statusCode).toBe(200)
        if (CadastraFornecedor.statusCode === 200) {
            FornededorID = CadastraFornecedor.body._id.toString()
            logger.info("ID do fornecedor Cadastrado: " + CadastraFornecedor.body._id.toString())
        } else {
            expect(CadastraFornecedor.statusCode).toBe(500)
            expect(CadastraFornecedor.body).toHaveProperty('message')
            logger.error("Erro ao castrar o fornecedor: " + CadastraFornecedor.body)
        };
    });
    it('• Deve execultar o método POST - Fornecedor já cadastrado e retorna-message', async () => {
        //método POST CNPJ Repetido
        const CadastraFornecedorTeste = await fornecedor.post('/cadastrar-fornecedor')
            .send({
                cnpj: CNPJ,
                nomeEmpresa: "Empresa_test_unitario",
                cep: "15997-159",
                endereco: "Rua joão",
                dataCadastro: new Date().toLocaleDateString().toString()
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        expect(CadastraFornecedorTeste.statusCode).toBe(200);
        if (CadastraFornecedorTeste.statusCode === 200) {
            logger.info('message:', CadastraFornecedorTeste.body);
        } else {
            expect(CadastraFornecedorTeste.statusCode).toBe(500);
            expect(CadastraFornecedorTeste.body).toHaveProperty('message');
        }
    });
    it('• Deve execultar o método GET - Todos os Fornecedores Cadastrados', async () => {
        //método GET
        const ConsultaFornecedores = await fornecedor.get('/listar-fornecedores')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        expect(ConsultaFornecedores.statusCode).toBe(200)
        if (ConsultaFornecedores.statusCode === 200) {
            logger.info("Tabela com todos os Fornecedores Cadastrado: ");
            logger.info(console.table(ConsultaFornecedores.body, ["_id", "cnpj", "nomeEmpresa", "cep", "endereco", "dataCadastro"]));
        } else {
            expect(ConsultaFornecedores.statusCode).toBe(500);
            expect(ConsultaFornecedores.body).toHaveProperty('message');
            logger.error("Erro ao consultar Fornecedores: " + ConsultaFornecedores.body);
        };
    });
    it("• Deve execultar o método GET - ID  do Fornecedor Cadastrado", async () => {
        //método GET
        const ConsultaFornecedorID = await fornecedor.get(`/listar-fornecedor/${FornededorID}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        expect(ConsultaFornecedorID.statusCode).toBe(200)
        if (ConsultaFornecedorID.statusCode === 200) {
            logger.info("Tabela do Fornecedor Cadastrado: ");
            logger.info(console.table(ConsultaFornecedorID.body));
        } else {
            expect(ConsultaFornecedorID.statusCode).toBe(500);
            expect(ConsultaFornecedorID.body).toHaveProperty('message');
            logger.error("Erro ao consultar Fornecedores: " + ConsultaFornecedorID.body);
        };
    });
    it("• Deve execultar o método PUT - ID do Fornecedor Cadastrado", async () => {
        //método PUT
        const ATualizaFornecedor = await fornecedor.put(`/atualizar-fornecedor/${FornededorID}`)
            .send({
                cnpj: newCNPJ,
                nomeEmpresa: "Empresa_test_unitario_put",
                cep: "71100-061",
                endereco: "Rua joão_put"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        expect(ATualizaFornecedor.statusCode).toBe(200)
        if (ATualizaFornecedor.statusCode === 200) {
            expect(ATualizaFornecedor.body).toHaveProperty('message');
            logger.info("Atualizou o  Fornecedor: " + true)
            logger.info("Novos Valores: ")
            const ConsultaFornecedorIDPUT = await fornecedor.get(`/listar-fornecedor/${FornededorID}`)
            logger.info(console.table(ConsultaFornecedorIDPUT.body));
        } else {
            expect(ATualizaFornecedor.statusCode).toBe(500);
            expect(ATualizaFornecedor.body).toHaveProperty('message');
            logger.info("Atualizou o  Fornecedor: " + false)
            logger.error("Erro ao consultar Fornecedores: " + ATualizaFornecedor.body);
        };
    })
    it("• Deve execultar o método DELETE -ID do Fornecedor Cadastrado", async () => {
        const ExcluirFornecedor = await fornecedor.delete(`/deletar-fornecedor/${FornededorID}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
        expect(ExcluirFornecedor.statusCode).toBe(200);
        expect(ExcluirFornecedor.body).toHaveProperty('message');
        if (ExcluirFornecedor.statusCode === 200) {
            logger.info("Fornecedor Deletado: " + true);
            logger.info(ExcluirFornecedor.body)
        } else {
            expect(ExcluirFornecedor.statusCode).toBe(500);
            logger.error("Erro ao deletar o fornecedor: " + ExcluirFornecedor.body)
        };
    });
});