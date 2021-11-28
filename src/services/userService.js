import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import * as userRepository from '../repositories/userRepository.js';
import * as sessionRepository from '../repositories/sessionRepository.js';
import { validateSignIn } from '../validation/sign-in.js';
import { validateSignUp } from '../validation/sign-up.js';

async function authSignIn({ email, password }) {
  const validate = validateSignIn.validate({
    email,
    password,
  });
  if (validate.error) return null;

  const user = await userRepository.findByEmail(email);
  if (!user) return null;
  const token = uuid();
  const session = await sessionRepository.createSession({ user, token });

  return { name: user.name, token: session.token };
}

async function authSignUp({ email, name, password, confirmPassword }) {
  const validate = validateSignUp.validate({
    name,
    email,
    password,
    confirmPassword,
  });
  if (validate.error) return null;

  const emailList = await userRepository.getEmailList();
  if (emailList?.some((dataEmail) => dataEmail.email === email)) {
    return undefined;
  }
  const passwordHash = bcrypt.hashSync(password, 10);

  const newUser = await userRepository.addNewUser({
    name,
    email,
    password: passwordHash,
  });
  if (!newUser) return null;
  return newUser;
}
async function requestFinishSession(token) {
  await sessionRepository.deleteSession(token);
}

export { authSignIn, authSignUp, requestFinishSession };
