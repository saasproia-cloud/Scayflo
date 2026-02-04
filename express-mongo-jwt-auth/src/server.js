const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/jwt');
const app = require('./app');

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});