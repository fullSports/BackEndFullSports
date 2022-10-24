const express = require ('express');
const cors = require ("cors");
const morgan = require('morgan')
const routes = require ("./routes/index.js");
const db = require ("./config/dbConnect.js");
const app = express(); 
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Headers", '*');
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
app.use(express.urlencoded({ extended: true}));
app.use(morgan)
routes(app)



module.exports=app

