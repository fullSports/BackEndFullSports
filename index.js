const app = require ("./src/app.js");

const PORT = process.env.PORT || 5000; 
app.listen(PORT, ()=>{
    console.log("Servidor funcionando em http://localhost:" + PORT,"\nconectando com o banco...")
})
