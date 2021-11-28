import connection from '../database.js';

async function getUserTransactionsByToken(token) {
  const result = await connection.query(
    `SELECT sessions.user_id, transactions.value,
       transactions.date, transactions.type, transactions.name
      FROM sessions JOIN transactions ON sessions.user_id = transactions.user_id
      WHERE token = $1`,
    [token],
  );
  return result?.rows;
}

async function insertNewTransaction({ value, userId, date, type, name }) {
  const transaction = await connection.query(
    `INSERT INTO transactions 
      (value, user_id, date, type, name) 
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [value, userId, date, type, name],
  );
  return transaction.rows[0];
}

export { getUserTransactionsByToken, insertNewTransaction };
