import express from 'express';
import cors from 'cors';
import * as userController from './controllers/userController.js';
import * as transactionController from './controllers/transactionController.js';
import { verifyToken } from './middlewares.js';

const app = express();

app.use(
  cors({
    allowedHeaders: ['sessionId', 'Content-Type'],
    exposedHeaders: ['sessionId'],
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  }),
);
app.use(express.json());

app.post('/sign-in', userController.signIn);
app.post('/sign-up', userController.signUp);
app.delete('/sign-out', verifyToken, userController.signOut);

app.get('/transactions', verifyToken, transactionController.getTransactions);
app.post('/transactions', verifyToken, transactionController.postTransaction);

export default app;
