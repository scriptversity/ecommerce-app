const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Register a new user => POST /api/v1/auth/register
const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'sample_id',
      url: 'sample_url'
    }
  });

  const token = user.getJwtToken();

  res.status(201).json({
    success: true,
    token,
    user
  });
});

module.exports = {
  registerUser,
  // Other controller methods can be added here
  // getUserProfile,
  // updateUserProfile,
  // loginUser,   
  // logoutUser,
  // forgotPassword,
  // resetPassword,
  // updatePassword,
  // getAllUsers,
  // getSingleUser,
  // updateUserRole,
  // deleteUser
  // deleteUser
}