import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import db from "./config/dbConnect.js";
const app = express(); 
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Headers", "*")
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors())
    next()
})
db.on("error", console.log.bind(console,"erro na conexão! "))
db.once("open", ()=> {
    console.log("conexão com banco bem-sucedida!")
})

app.use(express.json());
routes(app)



export default app

