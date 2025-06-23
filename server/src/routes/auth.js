const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// Route to register a new user
router.route('/register').post(registerUser);
// Route to login a user
router.route('/login').post(loginUser);

module.exports = router;