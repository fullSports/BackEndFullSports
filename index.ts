import {app}from './src/app/app'
import {db} from "./src/config/dbConnect/dbConnect";
db.on("error", console.log.bind(console,"erro na conexão! "))
db.once("open", ()=> {
    console.log("conexão com banco bem-sucedida!")
})

const PORT = process.env.PORT || 5000; 
app.listen(PORT, ()=>{
    console.log("Servidor funcionando em http://localhost:" + PORT,"\nconectando com o banco...")
})
