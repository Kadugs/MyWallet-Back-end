import dayjs from 'dayjs';
import * as transactionRepository from '../repositories/transactionRepository.js';
import * as sessionRepository from '../repositories/sessionRepository.js';
import { validateTransaction } from '../validation/transactions.js';

async function getUserTransactions(token) {
  const transactions = await transactionRepository.getUserTransactionsByToken(token);
  return transactions;
}

async function verifyAndPostTransaction({ value, type, name, token }) {
  const validate = validateTransaction.validate({ value, type, name });
  if (validate.error) {
    return null;
  }
  const date = dayjs().format('DD/MM/YYYY');
  const userId = await sessionRepository.getUserIdByToken(token);
  const postTransaction = await transactionRepository.insertNewTransaction({
    value,
    userId,
    date,
    type,
    name,
  });
  if (postTransaction.name === name) {
    return true;
  }
  return false;
}

export { getUserTransactions, verifyAndPostTransaction };
