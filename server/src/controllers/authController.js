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

const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler('Please enter email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }
  // If user is found and password matches, generate JWT token
  const token = user.getJwtToken();
  // and send response
  res.status(200).json({
    success: true,
    token,
    user
  });
});

module.exports = {
  registerUser,
  loginUser,   
  // Other controller methods can be added here
  // getUserProfile,
  // updateUserProfile,
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