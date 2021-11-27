import connection from '../database.js';

async function signOut(req, res) {
  const newLocal = 'authorization';
  const authorization = req.headers[newLocal];
  const token = authorization?.replace('Bearer ', '');
  if (!token) return res.sendStatus(401);
  try {
    await connection.query(
      `
    DELETE FROM
     sessions WHERE token = $1`,
      [token],
    );
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
}
export { signOut };
