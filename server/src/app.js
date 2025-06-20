const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes/index');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev')); // Logging middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use('/api/v1', routes);

module.exports = app;


