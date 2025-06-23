const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');

const router = express.Router();

// Route to register a new user
router.route('/register').post(registerUser);
// Route to login a user
router.route('/login').post(loginUser);
// Route to logout a user
router.route('/logout').get(logoutUser);

module.exports = router;