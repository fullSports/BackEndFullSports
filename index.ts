import  app from './src/app/app';
import logger from "./src/logger/index";
import Img from './src/asset/testes-unitarios.png'

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {    
    logger.info(`Servidor funcionando em http://localhost:${PORT} \nconectando com o banco...`)
})
