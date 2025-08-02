const express = require("express");
const {
  createUser,
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
  userDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  verifyEmail,
  resendVerificationEmail,
} = require("../controller/UserController");
const {
  isAuthenticatedUser,
  authorizedRoles,
  auth,
} = require("../middleware/auth");

const router = express.Router();

// Authentication routes
router.route("/register").post(createUser);
router.route("/verify-email/:token").get(verifyEmail);
router.route("/resend-verification").post(resendVerificationEmail);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

// Password routes
router.route("/password/forgot").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);

// User profile routes
router.route("/me/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update/profiles").put(auth, updateProfile); // flutter
router.route("/me").get(isAuthenticatedUser, userDetails);

// Admin routes
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteUser);

module.exports = router;
