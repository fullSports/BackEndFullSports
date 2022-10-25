const app = require ("./src/app.js");
const PORT = process.env.PORT || process.env.APP_URL; 
app.listen(PORT, ()=>{
    console.log("Servidor funcionando em http://localhost:" + PORT)
})
