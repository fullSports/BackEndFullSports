"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("../routes"));
const dbConnect_1 = __importDefault(require("../config/dbConnect/dbConnect"));
const express_2 = require("express");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const route = (0, express_2.Router)();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", '*');
    res.header("Access-Control-Allow-Origin", '*');
    res.header("'Content-Type'", "'multipart/form-data'");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use((0, cors_1.default)());
    next();
});
dbConnect_1.default.on("error", console.log.bind(console, "erro na conexão! "));
dbConnect_1.default.once("open", () => {
    console.log("conexão com banco bem-sucedida!");
});
app.use(express_1.default.json());
app.use(route);
(0, routes_1.default)(app);
app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '..', '..', 'tmp', 'uploads')));
exports.default = app;
