require("dotenv").config();
const express = require ('express');
const cors = require ("cors");
const routes = require ("./routes/index.js");
const db = require ("./config/dbConnect.js");
const path = require('path')
const app = express(); 
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Headers", '*');
    res.header("Access-Control-Allow-Origin", '*');
    res.header("'Content-Type'", "'multipart/form-data'");
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

app.use('/files',express.static(path.resolve(__dirname,'..','tmp','uploads')))



module.exports=app

