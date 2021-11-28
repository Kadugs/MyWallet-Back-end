import * as transactionService from '../services/transactionService.js';

async function getTransactions(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  const userTransactions = await transactionService.getUserTransactions(token);
  return res.send(userTransactions);
}

async function postTransaction(req, res) {
  const { authorization } = req.headers;
  const transaction = req.body;

  const token = authorization?.replace('Bearer ', '');
  const { value, type, name } = transaction;

  if (type !== 'out' && type !== 'in') {
    return res.status(400).send('tipo de transação inválida');
  }
  const newTransaction = await transactionService.verifyAndPostTransaction({
    value,
    type,
    name,
    token,
  });
  if (!newTransaction) {
    return res.status(400).send('Dados inseridos inválidos, tente novamente!');
  }
  return res.sendStatus(201);
}

export { getTransactions, postTransaction };
