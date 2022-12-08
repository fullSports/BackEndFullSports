const winston = require('winston');
 
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'info.log', level: 'info' }),
    ],
});
 
if (process.env.LOOGER !== 'prod') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}
export  default logger;