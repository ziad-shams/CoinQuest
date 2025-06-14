const express = require('express');
const cors = require('cors');
const tasksRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');

const app = express();

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true // allow cookies, auth headers if needed
}));
app.use(express.json());

app.use('/api/tasks', tasksRoutes);
app.use('/api/users', userRoutes);

module.exports = app;