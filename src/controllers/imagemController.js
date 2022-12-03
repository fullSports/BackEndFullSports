const Imagem = require("../models/imagem.js")
class imagemController {
    static listarImagem = (req,res)=>{
        Imagem.find((err,imagens)=>{
            res.status(200).json(imagens);
        });
    };
    static listarImagemId = async (req,res)=>{
        const id = req.params.id;
        Imagem.findById(id, (err, clientes) => {
            if (err) {
                res.status(400).sed({ menssage: `${err.menssage} - id do cliente não encotrado` });
            } else {
                res.status(200).send(clientes);
            }
        })
    }
    static cadastrarImagem = async (req, res) => {
        const { originalname: name, size, key, location: url = "" } = req.file;

        const imagemPost = await Imagem.create({
            name,
            size,
            key,
            url
        })
        res.json(imagemPost)
    }
    
    static deletarImagem= async(req,res)=>{
        const imagem = await Imagem.findById(req.params.id);
        await imagem.remove();
        return res.send({menssage: "imagem deletada com sucesso"});
    };
};
module.exports = imagemController;