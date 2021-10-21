import express from 'express';
import cors from 'cors';
import {listUserTransactions, postTransaction} from './controllers/transactions.js';
import {createAccount} from './controllers/sign-up.js'

const app = express(); //Para criar um servidor;

app.use(cors());
app.use(express.json());


//SIGN-IN

//SIGN-UP
app.post('/sign-up', createAccount);

// TRANSACTIONS
app.get('/transactions', listUserTransactions);
app.post('/transactions', postTransaction);


app.listen(4000) //Configura a porta;