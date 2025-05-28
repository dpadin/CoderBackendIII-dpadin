import { get } from "http";
import { loggerDev } from "../utils/logger.js";

const getAlllogs = async(req,res,next)=>{
try {       
 
     req.logger.error("custom logger- fatal");
     req.logger.warning("custom logger-error");
     req.logger.info("custom logger-warning");
     req.logger.http("custom logger-http");
     req.logger.debug("custom logger-debug");
     req.logger.silly("custom logger-silly");
     
    //custom levels: {"fatal":0, "error":1, "warning":2, "info":3, "http": 4, "debug":5},

    res.send({status:"success",payload:"logs ejecutados"})

}
catch (error) { 
     loggerDev.error(error.message);
     next(error)
    } 
}

export default {
    getAlllogs,

}

