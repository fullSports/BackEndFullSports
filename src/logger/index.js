"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston = require('winston');
exports.logger = winston.createLogger({
    format: winston.format.combine(winston.format.errors({ stack: true }), winston.format.json()),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'info.log', level: 'info' }),
    ],
});
if (process.env.NODE_ENV !== 'prod') {
    exports.logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}
