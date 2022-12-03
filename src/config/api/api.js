"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const url = process.env.APP_URL;
const api = axios_1.default.create({
    baseURL: url === null || url === void 0 ? void 0 : url.toString()
});
api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
exports.default = api;
