// Create, send an save JWT token in cookie
const sendToken = (user, statusCode, res) => {
  // Create JWT token
  const token = user.getJwtToken();

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + (process.env.COOKIE_EXPIRES_TIME || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    //   secure: process.env.NODE_ENV === 'PRODUCTION', // only over HTTPS
    secure: true,
    sameSite: 'Lax' // or 'Strict'/'None' depending on frontend/backend setup
  };


  const { password, ...userData } = user.toObject();

  // Send token in cookie
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    user: userData,
  });
}

module.exports = sendToken;