import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { jwtConfig } from '../config/jwt.js';

const saltRounds = 10;

const registerUser = async (email, password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ email, password: hashedPassword });
    return await newUser.save();
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
    return { token, user };
};

const verifyToken = (token) => {
    return jwt.verify(token, jwtConfig.secret);
};

export { registerUser, loginUser, verifyToken };