/* eslint-disable no-undef */

import '../src/setup.js';
import supertest from 'supertest';
import faker from 'faker';
import bcrypt from 'bcrypt';
import app from '../src/app.js';
import connection from '../src/database.js';

const token = faker.datatype.uuid();

beforeAll(async () => {
  const email = faker.internet.email();
  const password = bcrypt.hashSync('password', 10);

  await connection.query(`
    INSERT INTO users (name, email, password)
    VALUES ('testname', '${email}', '${password}');
    `);
  const user = await connection.query(
    `
    SELECT id
       FROM users
       WHERE email='${email}';
       `,
  );
  await connection.query(
    `
    INSERT
    INTO sessions (user_id, token)
    VALUES (${user.rows[0].id}, '${token}');`,
  );
});

describe('POST /transactions', () => {
  test('should returns 401 for a invalid token', async () => {
    const result = await supertest(app)
      .post('/transactions')
      .set('authorization', `Bearer ${faker.datatype.uuid()}`);
    expect(result.status).toBe(401);
  });

  test('should returns 400 for a invalid transaction', async () => {
    const body = {
      value: 'wrong-param',
      type: 'in',
      name: faker.name.findName(),
    };
    const result = await supertest(app)
      .post('/transactions')
      .set('authorization', `Bearer ${token}`)
      .send(body);
    expect(result.status).toBe(400);
  });

  test('should returns 201 for a invalid transaction', async () => {
    const body = {
      value: 20,
      type: 'in',
      name: faker.name.findName(),
    };
    const result = await supertest(app)
      .post('/transactions')
      .set('authorization', `Bearer ${token}`)
      .send(body);
    expect(result.status).toBe(201);
  });
});

describe('GET /transactions', () => {
  test('should returns 401 for a invalid token', async () => {
    const result = await supertest(app)
      .get('/transactions')
      .set('authorization', `Bearer ${faker.datatype.uuid()}`);
    expect(result.status).toBe(401);
  });
  test('should returns 200 for a invalid token', async () => {
    const result = await supertest(app)
      .get('/transactions')
      .set('authorization', `Bearer ${token}`);
    expect(result.status).toBe(200);
  });
});

afterAll(async () => {
  await connection.query('DELETE FROM sessions');
  await connection.query('DELETE FROM transactions');
  await connection.query('DELETE FROM users');
});

afterAll(() => {
  connection.end();
});
