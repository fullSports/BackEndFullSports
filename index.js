"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./src/app/app");
const dbConnect_1 = require("./src/config/dbConnect/dbConnect");
dbConnect_1.db.on("error", console.log.bind(console, "erro na conexão! "));
dbConnect_1.db.once("open", () => {
    console.log("conexão com banco bem-sucedida!");
});
const PORT = process.env.PORT || 5000;
app_1.app.listen(PORT, () => {
    console.log("Servidor funcionando em http://localhost:" + PORT, "\nconectando com o banco...");
});
