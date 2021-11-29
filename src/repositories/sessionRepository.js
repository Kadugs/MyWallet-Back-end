import connection from '../database.js';

async function createSession({ user, token }) {
  await connection.query(
    `
      DELETE FROM sessions 
      WHERE user_id = $1;`,
    [user.id],
  );
  const result = await connection.query(
    `
      INSERT INTO sessions 
      (user_id, token) 
      VALUES ($1, $2)
      RETURNING *;`,
    [user.id, token],
  );
  return result?.rows[0];
}
async function deleteSession(token) {
  await connection.query(
    `
    DELETE FROM
     sessions WHERE token = $1;`,
    [token],
  );
}

async function getUserIdByToken(token) {
  const userId = await connection.query('SELECT user_id FROM sessions WHERE token = $1', [
    token,
  ]);
  return userId?.rows[0].user_id;
}

export { createSession, deleteSession, getUserIdByToken };
