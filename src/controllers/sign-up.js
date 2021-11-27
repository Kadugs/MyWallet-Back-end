import bcrypt from 'bcrypt';
import { validateSignUp } from '../validation/sign-up.js';
import connection from '../database.js';

async function createAccount(req, res) {
  const signUpInfos = req.body;
  const { name, email, password, confirmPassword } = signUpInfos;
  if (password !== confirmPassword) {
    return res.status(401).send(`
    Senha e confirmação da senha diferentes! Insira valores iguais
    `);
  }

  const validate = validateSignUp.validate({
    name,
    email,
    password,
    confirmPassword,
  });
  if (validate.error) {
    return res.status(400).send(`
    Dados inseridos inválidos, tente novamente!
    `);
  }
  try {
    const emailList = await connection.query('SELECT email FROM users');
    if (emailList.rows.some((dataEmail) => dataEmail.email === email)) {
      return res.status(401).send('Email já cadastrado!');
    }
    const passwordHash = bcrypt.hashSync(password, 10);

    await connection.query(
      `
            INSERT INTO users 
            (name, email, password) 
            VALUES ($1, $2, $3)`,
      [name, email, passwordHash],
    );
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send('Erro no servidor!');
  }
}

export { createAccount };
