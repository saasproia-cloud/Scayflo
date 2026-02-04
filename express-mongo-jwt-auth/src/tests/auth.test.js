import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import User from '../models/user.model';
import { sign } from 'jsonwebtoken';
import { jwtSecret } from '../config/jwt';

describe('Authentication Tests', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await User.deleteMany({});
    });

    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'test@example.com',
                password: 'Password123'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
    });

    it('should login an existing user', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                email: 'test@example.com',
                password: 'Password123'
            });

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'Password123'
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should return 401 for invalid login', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'wrong@example.com',
                password: 'WrongPassword'
            });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'Invalid credentials');
    });

    it('should access protected route with valid token', async () => {
        const user = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'test@example.com',
                password: 'Password123'
            });

        const token = user.body.token;

        const response = await request(app)
            .get('/api/protected')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Access granted');
    });

    it('should return 403 for protected route without token', async () => {
        const response = await request(app)
            .get('/api/protected');

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('message', 'No token provided');
    });
});