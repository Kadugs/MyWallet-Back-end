import express from 'express';
import cors from 'cors';
import { listUserTransactions, postTransaction } from './controllers/transactions.js';
import { createAccount } from './controllers/sign-up.js';
import { userLogin } from './controllers/sign-in.js';
import { signOut } from './controllers/sign-out.js';

// Para criar um servidor;
const app = express();

app.use(cors());
app.use(express.json());

// SIGN-IN
app.post('/sign-in', userLogin);
// SIGN-UP
app.post('/sign-up', createAccount);
// SIGN-OUT
app.delete('/sign-out', signOut);

// TRANSACTIONS
app.get('/transactions', listUserTransactions);
app.post('/transactions', postTransaction);

export default app;
