const express = require('express');
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword } = require('../controllers/authController');

const router = express.Router();

// Route to register a new user
router.route('/register').post(registerUser);
// Route to login a user
router.route('/login').post(loginUser);
// Route to logout a user
router.route('/logout').get(logoutUser);
// Route to handle forgot password
router.route('/forgotpassword').post(forgotPassword);
// Route to reset password
router.route('/resetpassword/:token').put(resetPassword);

module.exports = router;