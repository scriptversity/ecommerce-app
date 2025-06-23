const express = require('express');
const { registerUser } = require('../controllers/authController');

const router = express.Router();

// Route to register a new user
router.route('/register').post(registerUser);

module.exports = router;