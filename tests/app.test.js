/* eslint-disable no-undef */
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database/database.js';

describe('sign-in', () => {
  test('returns 400 for invalid params', async () => {
    const body = {
      email: 'example.com',
      password: 'password',
    };
    const result = await supertest(app).post('/sign-in').send(body);
    expect(result.status).toEqual(400);
  });

  test('return 401 for invalid email', async () => {
    const body = {
      email: 'email@example123456.com',
      password: 'password',
    };
    const result = await supertest(app).post('/sign-in').send(body);
    const { status } = result;
    expect(status).toEqual(401);
  });
  test('return 200 for a valid email', async () => {
    const body = {
      email: 'app@test.com',
      password: 'test',
    };
    const result = await supertest(app).post('/sign-in').send(body);
    expect(result.status).toEqual(200);
  });
});

describe('sing-up', () => {
  beforeEach(async () => {
    await connection.query("DELETE FROM users WHERE email = 'app@test.com'");
  });
  test('return 401 for an already registered email', async () => {
    const body = {
      name: 'test',
      email: 'already@registered.com',
      password: 'test',
      confirmPassword: 'test',
    };
    const result = await supertest(app).post('/sign-up').send(body);
    expect(result.status).toEqual(401);
  });
  test('return 201 for a valid email', async () => {
    const body = {
      name: 'test',
      email: 'app@test.com',
      password: 'test',
      confirmPassword: 'test',
    };
    const result = await supertest(app).post('/sign-up').send(body);
    expect(result.status).toEqual(201);
  });
});

afterAll(() => {
  connection.end();
});
