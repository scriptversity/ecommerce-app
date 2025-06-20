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
app.use("/api/v1", (req, res) => {
  res.status(200).json({
    message: "Welcome to Shopit API",
    status: "success",
    data: {
      name: "Shopit API",
      version: "1.0.0",
      description: "A simple e-commerce API built with Express.js"
    }
  });
});

module.exports = app;


