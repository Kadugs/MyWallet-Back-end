import app from '../src/app.js';
import supertest from 'supertest';

describe("sign-in", () => {
    test("returns 400 for invalid params", async () => {
        const body = {
            email: 'example.com',
            password: 'password'
        };
        const result = await supertest(app).post("/sign-in").send(body);
        const status = result.status;
        expect(status).toEqual(400);
    });

    test("return 401 for invalid email", async () => {
        const body = {
            email: 'email@example123456.com',
            password: 'password'
        };
        const result = await supertest(app).post("/sign-in").send(body);
        const status = result.status;
        expect(status).toEqual(401);
    });
})