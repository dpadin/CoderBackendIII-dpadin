//import fs from 'fs';
//import loggerController from '../controllers/loggerController';
import { loggerDev, loggerProd } from '../utils/logger.js';

export const errorHandler=(error,req,res,next)   => {    
    const environment = process.env.NODE_ENV
    const page = req.originalUrl || req.url;
    const method = req.method || 'GET';
    if (req.environmet === 'PROD') {
        loggerProd.error(`Error: ${error.message} Page ${page} Environmet. ${environment} `);

    } else {
        loggerDev.error(`Error: ${error.message} Page ${page} Environmet. ${environment} `);
    }
    
    // let logFile = './src/logs/error.log';
    // if(fs.existsSync(logFile))
    //     {   fs.appendFileSync(logFile, `${new Date().toISOString()} - ${error.message}\n`);             }
    //      else
    //     {    fs.writeFileSync(logFile, `${new Date().toISOString()} - ${error.message}\n`);                          }
        
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({"error": "error inesperado"})

}

