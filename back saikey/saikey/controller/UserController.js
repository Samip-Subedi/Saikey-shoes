const User = require("../models/UserModel");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendMail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// Register user
exports.createUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler("User already exists with this email", 400));
    }

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "avatar/example",
        url: "https://example.com/avatar.jpg",
      },
    });

    const verificationToken = user.getEmailVerificationToken();
    await user.save({ validateBeforeSave: false });

    // Create verification URL with frontend URL
    const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
    const verificationUrl = `${FRONTEND_URL}/verify-email/${verificationToken}`;

    const message = `Please verify your email by clicking the link below: \n\n${verificationUrl}\n\nThis link will expire in 24 hours.`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Email Verification",
        message,
      });

      res.status(201).json({
        success: true,
        message: `Registration successful! Please check your email (${user.email}) to verify your account.`,
      });
    } catch (error) {
      await User.findByIdAndDelete(user._id);
      return next(
        new ErrorHandler("Email could not be sent. Please try again.", 500)
      );
    }
  } catch (error) {
    return next(new ErrorHandler("Registration failed", 500));
  }
});

// Verify email - FIXED
// exports.verifyEmail = catchAsyncErrors(async (req, res, next) => {
//   try {
//     // Hash the token from URL
//     const emailVerificationToken = crypto
//       .createHash("sha256")
//       .update(req.params.token)
//       .digest("hex");

//     console.log(req.params.token);
//     const user = await User.findOne({
//       emailVerificationToken,
//       emailVerificationExpires: { $gt: Date.now() },
//     });

//     if (!user) {
//       return next(
//         new ErrorHandler("Invalid or expired verification token", 400)
//       );
//     }

//     // Verify the user
//     user.isEmailVerified = true;
//     user.emailVerificationToken = undefined;
//     user.emailVerificationExpires = undefined;

//     await user.save({ validateBeforeSave: false });

//     const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
//     res.redirect(`${FRONTEND_URL}/email-verified?status=success`);
//   } catch (error) {
//     const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
//     res.redirect(`${FRONTEND_URL}/email-verified?status=error`);
//   }
// });

exports.verifyEmail = catchAsyncErrors(async (req, res, next) => {
  try {
    // Hash the token from URL
    const emailVerificationToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      emailVerificationToken,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        new ErrorHandler("Invalid or expired verification token", 400)
      );
    }

    // Verify the user
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Your email has been successfully verified!",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Email verification failed. Please try again.",
    });
  }
});

// Resend verification email - FIXED
exports.resendVerificationEmail = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("No user found with this email", 404));
  }

  if (user.isEmailVerified) {
    return next(new ErrorHandler("Email is already verified", 400));
  }

  // Generate new verification token
  const verificationToken = user.getEmailVerificationToken();
  await user.save({ validateBeforeSave: false });

  // Create verification URL - FIXED
  const verificationUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v2/verify-email/${verificationToken}`;

  const message = `Please verify your email address by clicking the following link:\n\n${verificationUrl}\n\nThis link will expire in 24 hours.\n\nIf you did not create an account, please ignore this email.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Please verify your email address",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Verification email sent to ${user.email}`,
    });
  } catch (error) {
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler("Email could not be sent", 500));
  }
});

// user login
// exports.loginUser = catchAsyncErrors(async (req, res, next) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return next(new ErrorHandler("Please enter the email & password", 400));
//   }

//   const user = await User.findOne({ email }).select("+password");

//   if (!user) {
//     return next(
//       new ErrorHandler("User is not found with this email & password", 401)
//     );
//   }

//   // Check if email is verified
//   if (!user.isEmailVerified) {
//     return next(
//       new ErrorHandler(
//         "Please verify your email address before logging in",
//         401
//       )
//     );
//   }

//   const isPasswordMatched = await user.comparePassword(password);

//   if (!isPasswordMatched) {
//     return next(
//       new ErrorHandler("User is not found with this email & password", 401)
//     );
//   }

//   sendToken(user, 201, res);
// });

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter both email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  // If user is not found
  if (!user) {
    return next(new ErrorHandler("No user found with this email address", 401));
  }

  // Check if email is verified
  if (!user.isEmailVerified) {
    return next(
      new ErrorHandler(
        "Please verify your email address before logging in",
        401
      )
    );
  }

  // Compare entered password with the stored hashed password
  const isPasswordMatched = await user.comparePassword(password);

  // If password doesn't match
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Incorrect password", 401));
  }

  // Generate token and send response
  sendToken(user, 200, res); // Updated the status code to 200 for successful login
});

// logout user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "You are logged out successfully",
  });
});

// forget password
exports.forgetPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("No user found with this email", 404));
  }

  // Check if email is verified
  if (!user.isEmailVerified) {
    return next(
      new ErrorHandler("Please verify your email address first", 400)
    );
  }

  // get resetPassword token
  const resetToken = user.getResetToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: \n\n ${resetPasswordUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 minutes)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: `Token email sent to ${user.email} successfully`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTime = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(err.message, 500));
  }
});

// reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // token hash created
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTime: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Invalid token or token expired", 400));
  }

  if (req.body.password !== req.body.passwordConfirm) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordTime = undefined;
  await user.save();

  sendToken(user, 200, res);
});

//get user details
exports.userDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// update user password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.passwordConfirm) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

// update user profile details
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body);

  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // Handle avatar update - FIXED CONDITION
  if (req.body.avatar && req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//get all users ===admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// get single user details  ===admin
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not found with this id", 400));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//change user status(role) --admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!user) {
    return next(new ErrorHandler("User not found with this id", 400));
  }

  res.status(200).json({
    success: true,
  });
});

// delete user
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not found with this id", 400));
  }

  const imageId = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(imageId);

  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
