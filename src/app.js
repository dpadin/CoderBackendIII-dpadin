import express from 'express';
import mongoose from 'mongoose';
import  { urlencoded } from "express";
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import loggerRouter from './routes/loggerRouter.js';  
import mocksRouter from './routes/mocks.router.js ';  

import dotenv from 'dotenv';
//import { error } from 'console';
import { errorHandler } from './middlewares/errorHandler.js';
import { loggerProd, loggerDev, middlelog } from "./utils/logger.js"

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Adoption API',
      version: '1.0.0',
      description: 'API for managing pet adoptions',
    },
  },
  apis: ["./src/docs/*.yaml"]
};
const specs = swaggerJsdoc(options);

dotenv.config();


const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
const PORT = process.env.PORT||8080;

try {
   mongoose.set('strictQuery', false); // To avoid deprecation warning
   const mongoConnection =process.env.MONGO_WEB
   mongoose.connect(mongoConnection)
 
  loggerDev.info('Connected to MongoDB');
} catch (error) {
  loggerDev.error('Error connecting to MongoDB:', error.message);
}

app.use(express.json());
  app.use(urlencoded({ extended: true }))
app.use(cookieParser());
app.use (middlelog); // Middleware to set logger based on environment


app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/loggerTest',loggerRouter);
app.use('/api/mocks',mocksRouter);

app.use(errorHandler);


app.listen(PORT,()=>

loggerDev.info(`Listening on ${PORT}`))
loggerDev.info(`Server mode = ${process.env.NODE_ENV}`)

