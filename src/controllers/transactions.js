import dayjs from 'dayjs';
import connection from '../database.js';
import { validateTransaction } from '../validation/transactions.js';

async function listUserTransactions(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  try {
    const userInfo = await connection.query(
      'SELECT user_id FROM sessions WHERE token = $1',
      [token],
    );
    const userTransactions = await connection.query(
      'SELECT value, date, type, name FROM transactions WHERE user_id = $1',
      [userInfo.rows[0].user_id],
    );
    return res.send(userTransactions.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Erro do servidor');
  }
}

async function postTransaction(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  const transaction = req.body;
  const { value, type, name } = transaction;
  if (type !== 'out' && type !== 'in') {
    return res.status(400).send('tipo de transação inválida');
  }
  const validate = validateTransaction.validate({ value, type, name });
  if (validate.error) {
    return res.status(400).send('Dados inseridos inválidos, tente novamente!');
  }
  const date = dayjs().format('DD/MM/YYYY');

  try {
    const userId = await connection.query(
      'SELECT user_id FROM sessions WHERE token = $1',
      [token],
    );

    await connection.query(
      `
            INSERT INTO transactions 
                (value, user_id, date, type, name) 
                VALUES ($1, $2, $3, $4, $5)`,
      [value, userId.rows[0].user_id, date, type, name],
    );
    return res.sendStatus(201);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Erro do servidor');
  }
}

export { listUserTransactions, postTransaction };
