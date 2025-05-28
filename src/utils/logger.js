import winston from 'winston';
import {fileURLToPath} from "url"
import {dirname} from "path"
 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);  

export default __dirname
export const loggerDev = winston.createLogger({        //logger dev
        levels: {"fatal":0, "error":1, "warning":2, "info":3, "http": 4, "debug":5,"silly":6  },
        transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.simple()
            )
        })]   
   })


export const loggerProd = winston.createLogger({        //logger Production
levels: {"fatal":0, "error":1, "warning":2, "info":3, "http": 4, "debug":5,"ssilly":6},   
    transports: [
        new winston.transports.Console({
            level:"info",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            level:"info",
            filename: "./src/logs/errors.log",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        })]
    
    })

 export const middlelog=(req,res,next)  => {
    const envirenmet = process.env.NODE_ENV
 
    if (envirenmet === 'PROD') {
        req.logger = loggerProd; // Use prod logger if NODE_ENV is set to PROD
    } else {
        req.logger = loggerDev; // Fallback to dev logger for any other environment
    }
   req.environmet = envirenmet;
    next()
 }