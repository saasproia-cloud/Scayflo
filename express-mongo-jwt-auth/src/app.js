const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const { dbConnection } = require('./config/db');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
dbConnection();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

module.exports = app;