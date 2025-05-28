import { Router } from 'express';
import loggerController from '../controllers/loggerController.js';
import { loggerDev } from '../utils/logger.js';

const router = Router();

loggerDev.info("Logger router initialized");
 router.get('/',loggerController.getAlllogs);

export default router;