import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  login,
  register,
  resendVerificationEmail,
} from "../../actions/UserActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icons
import {
  FiMail,
  FiLock,
  FiUser,
  FiUpload,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

// Components
import Loader from "../../more/Loader";
import MetaData from "../../more/MetaData";

import "./LoginSign.css";

const LoginSignup = ({ history, location }) => {
  const dispatch = useDispatch();
  const {
    error,
    loading,
    isAuthenticated,
    registrationSuccess,
    resendingEmail,
    resendMessage,
    resendError,
  } = useSelector((state) => state.user);

  // Login states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [activeTab, setActiveTab] = useState("login");

  // Register states
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("/profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/profile.png");

  // Password validation states
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  // Email verification states
  const [registeredEmail, setRegisteredEmail] = useState("");

  // Lockout management functions
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState(null);

  // Define showToast function
  const showToast = (message, type = "error") => {
    toast(message, {
      type: type, // 'error' or 'success' based on the type passed
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Lockout management functions
  const startLockout = () => {
    setIsLocked(true);
    setTimeRemaining(30);

    showToast(
      "Too many failed attempts. Account locked for 30 seconds.",
      "error"
    );

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsLocked(false);
          setFailedAttempts(0);
          setLockoutTimer(null);
          showToast(
            "Account unlocked. You can try logging in again.",
            "success"
          );
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setLockoutTimer(timer);
  };

  // Clear lockout timer on component unmount
  useEffect(() => {
    return () => {
      if (lockoutTimer) {
        clearInterval(lockoutTimer);
      }
    };
  }, [lockoutTimer]);

  // Handle redirection after successful registration
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (isAuthenticated) {
      setFailedAttempts(0); // Reset failed attempts after successful login
      if (lockoutTimer) {
        clearInterval(lockoutTimer);
        setLockoutTimer(null);
      }
      setIsLocked(false);
      history.push(redirect); // Redirect to the original page or home
    }

    if (error) {
      // Handle errors after login attempt
      const isLoginError =
        error.includes("Invalid") ||
        error.includes("password") ||
        error.includes("email");
      if (isLoginError && activeTab === "login") {
        const newFailedAttempts = failedAttempts + 1;
        setFailedAttempts(newFailedAttempts);

        if (newFailedAttempts >= 3) {
          startLockout();
        } else {
          showToast(
            `${error}. ${3 - newFailedAttempts} attempts remaining.`,
            "error"
          );
        }
      } else {
        showToast(error, "error");
      }

      dispatch(clearErrors());
    }
  }, [
    dispatch,
    error,
    history,
    isAuthenticated,
    redirect,
    failedAttempts,
    lockoutTimer,
    resendMessage,
    resendError,
    registrationSuccess,
  ]);

  // Handle form submission for login
  const loginSubmit = (e) => {
    e.preventDefault();
    if (isLocked) {
      showToast(
        `Account is locked. Please wait ${timeRemaining} seconds.`,
        "error"
      );
      return;
    }
    dispatch(login(loginEmail, loginPassword));
  };

  // Handle form submission for registration
  const registerSubmit = (e) => {
    e.preventDefault();
    if (!isPasswordValid) {
      showToast(
        "Please make sure your password meets all the requirements",
        "error"
      );
      return;
    }

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    dispatch(register(myForm));
  };

  // Handle form input changes for registration
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }

    if (e.target.name === "password") {
      validatePassword(e.target.value);
    }
  };

  // Validate password strength for registration
  const validatePassword = (password) => {
    const errors = [];
    const lengthRegex = /^.{8,12}$/;
    const capitalLetterRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (!lengthRegex.test(password)) {
      errors.push("Password must be between 8-12 characters.");
    }
    if (!capitalLetterRegex.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }
    if (!numberRegex.test(password)) {
      errors.push("Password must contain at least one number.");
    }
    if (!symbolRegex.test(password)) {
      errors.push("Password must contain at least one special character.");
    }

    // Set errors and password strength
    if (errors.length === 0) {
      setPasswordStrength("strong");
      setIsPasswordValid(true);
    } else if (errors.length <= 2) {
      setPasswordStrength("decent");
      setIsPasswordValid(false);
    } else {
      setPasswordStrength("weak");
      setIsPasswordValid(false);
    }

    setPasswordErrors(errors);
  };

  // Handle resend verification email
  const handleResendVerificationEmail = () => {
    if (registeredEmail) {
      dispatch(resendVerificationEmail(registeredEmail));
    }
  };

  // If registration was successful, show verification message
  if (registrationSuccess) {
    return (
      <>
        <MetaData title="Email Verification Required" />
        <div className="auth-container">
          <div className="auth-content">
            <div className="auth-card">
              <div className="auth-header">
                <FiCheckCircle className="verification-icon" />
                <h2 className="auth-title">Check Your Email</h2>
                <p className="auth-subtitle">
                  We've sent a verification link to{" "}
                  <strong>{registeredEmail}</strong>
                </p>
              </div>

              <div className="verification-message">
                <p>
                  Please click the verification link in your email to activate
                  your account. The link will expire in  10 minutes.
                </p>
                <p>
                  Can't find the email? Check your spam folder or click the
                  button below to resend.
                </p>
              </div>

              <div className="verification-actions">
                <button
                  onClick={handleResendVerificationEmail}
                  disabled={resendingEmail}
                  className="auth-button"
                >
                  {resendingEmail ? "Sending..." : "Resend Verification Email"}
                </button>

                <button
                  onClick={() => {
                    dispatch({ type: "CLEAR_VERIFICATION_STATES" });
                    setActiveTab("login");
                  }}
                  className="auth-button-secondary"
                >
                  Back to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Login or Signup" />
          <div className="auth-container">
            <div className="auth-content">
              <div className="auth-card">
                <div className="auth-header">
                  <h2 className="auth-title">Welcome</h2>
                  <p className="auth-subtitle">
                    Sign in to your account or create a new one
                  </p>
                </div>

                <div className="auth-tabs">
                  <button
                    className={`auth-tab ${
                      activeTab === "login" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("login")}
                  >
                    Login
                  </button>
                  <button
                    className={`auth-tab ${
                      activeTab === "register" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("register")}
                  >
                    Register
                  </button>
                </div>

                {activeTab === "login" ? (
                  <form className="auth-form" onSubmit={loginSubmit}>
                    {/* Lockout notification */}
                    {isLocked && (
                      <div className="lockout-notification">
                        <FiClock className="lockout-icon" />
                        <div className="lockout-text">
                          <p>Account temporarily locked</p>
                          <p>Please wait {timeRemaining} seconds</p>
                        </div>
                      </div>
                    )}

                    {/* Failed attempts warning */}
                    {failedAttempts > 0 && failedAttempts < 3 && !isLocked && (
                      <div className="failed-attempts-warning">
                        <p>
                          {failedAttempts} failed attempt
                          {failedAttempts > 1 ? "s" : ""}.{3 - failedAttempts}{" "}
                          remaining before lockout.
                        </p>
                      </div>
                    )}

                    <div className="form-group">
                      <label htmlFor="loginEmail">Email</label>
                      <div className="input-group">
                        <FiMail className="input-icon" />
                        <input
                          type="email"
                          id="loginEmail"
                          placeholder="Enter your email"
                          required
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          disabled={isLocked}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="loginPassword">Password</label>
                      <div className="input-group">
                        <FiLock className="input-icon" />
                        <input
                          type="password"
                          id="loginPassword"
                          placeholder="Enter your password"
                          required
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          disabled={isLocked}
                        />
                      </div>
                    </div>

                    <div className="form-links">
                      <Link to="/password/forgot" className="forgot-password">
                        Forgot Password?
                      </Link>
                    </div>

                    <button
                      type="submit"
                      className={`auth-button ${isLocked ? "disabled" : ""}`}
                      disabled={isLocked}
                    >
                      {isLocked ? `Locked (${timeRemaining}s)` : "Login"}
                    </button>

                    <div className="guest-login">
                      <Link to="/">
                        <span>Login as a guest</span>
                      </Link>
                    </div>
                  </form>
                ) : (
                  <form
                    className="auth-form"
                    encType="multipart/form-data"
                    onSubmit={registerSubmit}
                  >
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <div className="input-group">
                        <FiUser className="input-icon" />
                        <input
                          type="text"
                          id="name"
                          placeholder="Enter your name"
                          required
                          name="name"
                          value={name}
                          onChange={registerDataChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <div className="input-group">
                        <FiMail className="input-icon" />
                        <input
                          type="email"
                          id="email"
                          placeholder="Enter your email"
                          required
                          name="email"
                          value={email}
                          onChange={registerDataChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <div className="input-group">
                        <FiLock className="input-icon" />
                        <input
                          type="password"
                          id="password"
                          placeholder="Create a password"
                          required
                          name="password"
                          value={password}
                          onChange={registerDataChange}
                        />
                      </div>

                      {/* Password validation error messages */}
                      {passwordErrors.length > 0 && (
                        <div className="password-error-messages">
                          {passwordErrors.map((error, index) => (
                            <p key={index} className="error-message">
                              {error}
                            </p>
                          ))}
                        </div>
                      )}

                      {password && (
                        <div
                          className={`password-strength ${passwordStrength}`}
                        >
                          Password Strength: {passwordStrength}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Profile Picture</label>
                      <div className="avatar-upload">
                        <div className="avatar-preview">
                          <img src={avatarPreview} alt="Avatar Preview" />
                        </div>
                        <div className="avatar-edit">
                          <label
                            htmlFor="avatar-input"
                            className="upload-label"
                          >
                            <FiUpload /> Choose Image
                          </label>
                          <input
                            type="file"
                            id="avatar-input"
                            name="avatar"
                            accept="image/*"
                            onChange={registerDataChange}
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="auth-button"
                      disabled={!isPasswordValid}
                    >
                      Create Account
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="auth-image">
              {/* Background image will be applied via CSS */}
            </div>
          </div>

          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </>
      )}
    </>
  );
};

export default LoginSignup;
