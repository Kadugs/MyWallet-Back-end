import * as userService from '../services/userService.js';

async function signIn(req, res) {
  const { email, password } = req.body;
  const user = await userService.authSignIn({ email, password });
  if (!user) {
    return res.status(400).send('Dados inseridos inválidos, tente novamente!');
  }
  return res.status(200).send(user);
}

async function signUp(req, res) {
  const signUpInfos = req.body;
  const { name, email, password, confirmPassword } = signUpInfos;
  if (password !== confirmPassword) {
    return res.status(401).send(`
    Senha e confirmação da senha diferentes! Insira valores iguais
    `);
  }
  const user = await userService.authSignUp({ name, email, password, confirmPassword });
  if (user === undefined) {
    return res.status(401).send('Email já cadastrado!');
  }
  if (user === null) {
    return res.status(400).send(`
    Dados inseridos inválidos, tente novamente!
    `);
  }

  return res.sendStatus(201);
}

async function signOut(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  await userService.requestFinishSession(token);
  return res.sendStatus(204);
}

export { signIn, signUp, signOut };
