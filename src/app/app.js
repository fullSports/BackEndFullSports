"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("../routes");
const express_2 = require("express");
const path_1 = __importDefault(require("path"));
exports.app = (0, express_1.default)();
const route = (0, express_2.Router)();
exports.app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", '*');
    res.header("Access-Control-Allow-Origin", '*');
    res.header("'Content-Type'", "'multipart/form-data'");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    exports.app.use((0, cors_1.default)());
    next();
});
exports.app.use(express_1.default.json());
exports.app.use(route);
(0, routes_1.Routes)(exports.app);
exports.app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '..', '..', 'tmp', 'uploads')));
