import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import connection from '../database.js';
import { validateSignIn } from '../validation/sign-in.js';

async function userLogin(req, res) {
  const { email, password } = req.body;
  const validate = validateSignIn.validate({
    email,
    password,
  });
  if (validate.error) {
    return res.status(400).send('Dados inseridos inválidos, tente novamente!');
  }

  try {
    const database = await connection.query(
      `
      SELECT users.password, users.id, users.name
      FROM users where email = $1`,
      [email],
    );
    if (database.rowCount === 0) {
      return res
        .status(401)
        .send('Email não cadastrado, tente novamente ou crie uma conta!');
    }
    if (bcrypt.compareSync(password, database.rows[0].password)) {
      const token = uuid();
      await connection.query(
        `
                DELETE FROM sessions 
                WHERE user_id = $1`,
        [database.rows[0].id],
      );
      await connection.query(
        `
                INSERT INTO sessions 
                (user_id, token) 
                VALUES ($1, $2)`,
        [database.rows[0].id, token],
      );
      return res.status(200).send({
        token,
        name: database.rows[0].name,
      });
    }
    return res.status(409).send('Senha inválida!');
  } catch {
    return res.status(500).send('Erro no servidor!');
  }
}
export { userLogin };
