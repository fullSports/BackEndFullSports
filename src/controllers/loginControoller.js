const login = require = require("../models/login.js");

class loginController {
    static cadastrarLogin = async (req, res) => {
        let loginBody = new login(req.body);
        const {email} = req.body
        try {
            const usuarioExiste = await login.findOne({ email })
            if(!usuarioExiste){
                loginBody.save((err) => {
                    if (err) {
                        res.status(500).send(({ message: `${err.message} - falha ao cadastrar o login` }));
                    } else {
                        res.status(200).send(loginBody.toJSON())
                    };
                })
            }else{
                res.status(200).send(({message: "email ja cadastrado"}))
            }    
    }catch (error) {
        res.status(500).json({ message: "Erro ao pesquisar email!" })
    }
    }
    static listarLogin = (req, res) => {
        login.find((err, loginBody) => {
            try {
                res.status(200).json(loginBody)
            } catch {
                res.status(400).json(`erro ao listar login- ${err}`)
            }
        })
    }
    static listarLoginID = (req, res) => {
        const id = req.params.id

        login.findById(id, (err, loginBody) => {
            if (err) {
                res.status(400).sed({ menssage: `${err.menssage} - id do fornecedor não encotrado` });
            } else {
                res.status(200).send(loginBody);
            }
        })
    }
    static atualizarLogin = (req, res) => {
        const id = req.params.id;

        login.findById(id, (err, loginBody) => {
            if (err) {
                res.status(400).sed({ menssage: `${err.menssage} - id do login não encontrado` });
            } else {
                res.status(200).send(loginBody);
            }
        })
    }
    static excluirLogin = (req, res) => {
        const id = req.params.id;
        login.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({ message: `login deletado` });
            } else {
                res.status(500).send({ message: `${err.message} - erro ao deletar login` });
            }
        });
    }
    static realizarLogin = async (req, res) => {
        const {email,password} = req.body
        try {
            const usuarioExiste = await login.findOne({ email })
            console.log(usuarioExiste.email)
            if (!usuarioExiste) return res.status(404).send("Email Não Encontrado!")
            const passwordValido = password == usuarioExiste.password
            if (!passwordValido) return res.status(404).send("Senha incorreta!")
            res.status(200).json({ result: usuarioExiste })
        } catch (error) {
            res.status(500).json({ message: "Erro ao Tentar Login!" })
        }

    }
}
module.exports = loginController;