import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import User from '../models/user.model';

describe('User API', () => {
    let userId;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await User.deleteMany({});
        await mongoose.connection.close();
    });

    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                email: 'testuser@example.com',
                password: 'password123'
            });
        
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('user');
        userId = res.body.user._id;
    });

    it('should fetch user details', async () => {
        const res = await request(app)
            .get(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${process.env.TEST_JWT}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
        expect(res.body.user.email).toEqual('testuser@example.com');
    });

    it('should update user information', async () => {
        const res = await request(app)
            .put(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${process.env.TEST_JWT}`)
            .send({
                email: 'updateduser@example.com'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
        expect(res.body.user.email).toEqual('updateduser@example.com');
    });

    it('should delete the user', async () => {
        const res = await request(app)
            .delete(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${process.env.TEST_JWT}`);

        expect(res.statusCode).toEqual(204);
    });
});