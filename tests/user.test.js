/* eslint-disable no-undef */
import '../setup.js';
import faker from 'faker';
import supertest from 'supertest';
import bcrypt from 'bcrypt';
import app from '../src/app.js';
import connection from '../src/database.js';

describe('sign-in', () => {
  const email = 'signin@test.com';
  const password = bcrypt.hashSync('password', 10);
  beforeAll(async () => {
    await connection.query(`
    INSERT
    INTO users (name, email, password)
    VALUES ('${faker.name.findName()}', '${email}', '${password}');`);
  });
  test('returns 400 for invalid params', async () => {
    const body = {
      email: 'example.com',
      password: 'password',
    };
    const result = await supertest(app).post('/sign-in').send(body);
    expect(result.status).toBe(400);
  });

  test('return 401 for invalid email', async () => {
    const body = {
      email: faker.internet.email(),
      password: 'passwords',
    };
    const result = await supertest(app).post('/sign-in').send(body);
    expect(result.status).toBe(401);
  });
  test('return 200 for a valid email and password', async () => {
    const body = {
      email,
      password: 'password',
    };
    const result = await supertest(app).post('/sign-in').send(body);
    expect(result.status).toBe(200);
  });
  afterAll(async () => {
    await connection.query('DELETE FROM users;');
  });
});

describe('sing-up', () => {
  beforeAll(async () => {
    await connection.query('DELETE FROM users;');
  });
  test('return 201 for a valid email', async () => {
    const body = {
      name: 'test',
      email: 'signUp@test.com',
      password: 'test',
      confirmPassword: 'test',
    };
    const result = await supertest(app).post('/sign-up').send(body);
    expect(result.status).toBe(201);
  });
});
test('return 401 for an already registered email', async () => {
  const body = {
    name: 'test',
    email: 'signUp@test.com',
    password: 'test',
    confirmPassword: 'test',
  };
  const result = await supertest(app).post('/sign-up').send(body);
  expect(result.status).toBe(401);
});

afterAll(() => {
  connection.end();
});
