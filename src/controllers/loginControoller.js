const login = require("../models/login.js");
const bcrypt = require("bcrypt");
class loginController {
    static cadastrarLogin = async (req, res) => {
        let loginBody = new login(req.body);
        const { email, password, isAdmin } = req.body
        try {
            const usuarioExiste = await login.findOne({ email })
            if (!usuarioExiste) {
                bcrypt.hash(password, 10)
                    .then(hash => {
                        let encryptedPassowrd = hash

                        let newLogin = new login({
                            email: email,
                            password: encryptedPassowrd,
                            isAdmin: isAdmin
                        });
                        newLogin.save((err) => {
                            if (err) {
                                res.status(500).send(({ message: `${err.message} - falha ao cadastrar o login` }));
                            } else {
                                res.status(200).send(newLogin.toJSON())
                            };
                        })
                    }).catch(err => res.status(500).json({ message: `erro ao cadastrar login- ${err}` }))


            } else {
                res.status(200).send(({ message: "email ja cadastrado" }))
            }
        } catch (error) {
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
        const { email, password } = req.body
        try {
            const usuarioExiste = await login.findOne({ email })
            console.log(usuarioExiste.email)
            if (!usuarioExiste) return res.status(404).send({ message: "email já existe" })
            const comparaSenha = await bcrypt.compareSync(password, usuarioExiste.password)
            if (comparaSenha) {
                console.log("senha correta ")
                return res.status(200).json({ result: usuarioExiste })
            } else {
                return res.status(404).send({ message: "senha incorreta" })
            }

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Erro ao Tentar Login!" })
        }
    }
    static pesquisarEmail = async (req, res) => {
        const { email } = req.body;
        try {
            const pesquisaEmail = await login.findOne({ email });
            if (!pesquisaEmail) {
                res.status(200).send({ emailExiste: false });
            } else {
                console.log(pesquisaEmail.email);
                res.status(200).send({ emailExiste: true });
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Erro ao pesquisar o e-mail!" })
        }
    }
}
module.exports = loginController;