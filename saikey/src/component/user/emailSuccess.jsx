// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import { FiCheckCircle, FiXCircle } from "react-icons/fi";
// import Loader from "../../more/Loader";
// import MetaData from "../../more/MetaData";

// const EmailVerification = () => {
//   const { token } = useParams();
//   const [verificationStatus, setVerificationStatus] = useState("loading"); // loading, success, error
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const verifyEmail = async () => {
//       try {
//         const { data } = await axios.get(`/api/v1/verify-email/${token}`);
//         setVerificationStatus("success");
//         setMessage(data.message);
//         toast.success(data.message);
//       } catch (error) {
//         setVerificationStatus("error");
//         setMessage(
//           error.response?.data?.message || "Email verification failed"
//         );
//         toast.error(
//           error.response?.data?.message || "Email verification failed"
//         );
//       }
//     };

//     if (token) {
//       verifyEmail();
//     }
//   }, [token]);

//   if (verificationStatus === "loading") {
//     return <Loader />;
//   }

//   return (
//     <>
//       <MetaData title="Email Verification" />
//       <div className="auth-container">
//         <div className="auth-content">
//           <div className="auth-card">
//             <div className="auth-header">
//               {verificationStatus === "success" ? (
//                 <FiCheckCircle
//                   className="verification-icon"
//                   style={{ color: "#10b981" }}
//                 />
//               ) : (
//                 <FiXCircle
//                   className="verification-icon"
//                   style={{ color: "#ef4444" }}
//                 />
//               )}
//               <h2 className="auth-title">
//                 {verificationStatus === "success"
//                   ? "Email Verified!"
//                   : "Verification Failed"}
//               </h2>
//               <p className="auth-subtitle">{message}</p>
//             </div>

//             <div className="verification-message">
//               {verificationStatus === "success" ? (
//                 <div>
//                   <p>Your email has been successfully verified!</p>
//                   <p>
//                     You can now login to your account and enjoy all features.
//                   </p>
//                 </div>
//               ) : (
//                 <div>
//                   <p>The verification link may have expired or is invalid.</p>
//                   <p>
//                     Please try registering again or contact support if the
//                     problem persists.
//                   </p>
//                 </div>
//               )}
//             </div>

//             <div className="verification-actions">
//               <Link to="/login" className="auth-button">
//                 {verificationStatus === "success"
//                   ? "Login Now"
//                   : "Back to Login"}
//               </Link>
//               {verificationStatus === "error" && (
//                 <Link to="/register" className="auth-button-secondary">
//                   Register Again
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="auth-image">
//           {/* Background image will be applied via CSS */}
//         </div>
//       </div>
//       <ToastContainer
//         position="bottom-center"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </>
//   );
// };

// export default EmailVerification;

// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import { FiCheckCircle, FiXCircle } from "react-icons/fi";
// import Loader from "../../more/Loader";
// import MetaData from "../../more/MetaData";

// const EmailVerification = () => {
//   const { token } = useParams();
//   const [verificationStatus, setVerificationStatus] = useState("loading");
//   const [message, setMessage] = useState("");

//   console.log(token);

//   useEffect(() => {
//     const verifyEmail = async () => {
//       try {
//         const { data } = await axios.get(`/api/v1/verify-email/${token}`);
//         setVerificationStatus("success");
//         setMessage(data.message);
//         toast.success(data.message);
//       } catch (error) {
//         setVerificationStatus("error");
//         setMessage(
//           error.response?.data?.message || "Email verification failed"
//         );
//         toast.error(
//           error.response?.data?.message || "Email verification failed"
//         );
//       }
//     };

//     if (token) {
//       verifyEmail();
//     } else {
//       setVerificationStatus("error");
//       setMessage("Invalid verification link - no token provided");
//       toast.error("Invalid verification link");
//     }
//   }, [token]);

//   if (verificationStatus === "loading") {
//     return <Loader />;
//   }

//   return (
//     <>
//       <MetaData title="Email Verification" />
//       <div className="auth-container">
//         <div className="auth-content">
//           <div className="auth-card">
//             <div className="auth-header">
//               {verificationStatus === "success" ? (
//                 <FiCheckCircle
//                   className="verification-icon"
//                   style={{ color: "#10b981", fontSize: "4rem" }}
//                 />
//               ) : (
//                 <FiXCircle
//                   className="verification-icon"
//                   style={{ color: "#ef4444", fontSize: "4rem" }}
//                 />
//               )}
//               <h2 className="auth-title">
//                 {verificationStatus === "success"
//                   ? "Email Verified!"
//                   : "Verification Failed"}
//               </h2>
//               <p className="auth-subtitle">{message}</p>
//             </div>
//             <div className="verification-message">
//               {verificationStatus === "success" ? (
//                 <div>
//                   <p>Your email has been successfully verified!</p>
//                   <p>
//                     You can now login to your account and enjoy all features.
//                   </p>
//                 </div>
//               ) : (
//                 <div>
//                   <p>The verification link may have expired or is invalid.</p>
//                   <p>
//                     Please try registering again or contact support if the
//                     problem persists.
//                   </p>
//                 </div>
//               )}
//             </div>
//             <div className="verification-actions">
//               <Link to="/login" className="auth-button">
//                 {verificationStatus === "success"
//                   ? "Login Now"
//                   : "Back to Login"}
//               </Link>
//               {verificationStatus === "error" && (
//                 <Link to="/register" className="auth-button-secondary">
//                   Register Again
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="auth-image">
//           {/* Background image will be applied via CSS */}
//         </div>
//       </div>
//       <ToastContainer
//         position="bottom-center"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </>
//   );
// };

// export default EmailVerification;

// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import { FiCheckCircle, FiXCircle } from "react-icons/fi";
// import Loader from "../../more/Loader";
// import MetaData from "../../more/MetaData";

// const EmailVerification = () => {
//   const { token } = useParams(); // Fetch the token from the URL params
//   const [verificationStatus, setVerificationStatus] = useState("loading"); // loading, success, error
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const verifyEmail = async () => {
//       try {
//         const { data } = await axios.get(`/api/v2/verify-email/${token}`); // Call backend to verify email
//         setVerificationStatus("success");
//         setMessage(data.message);
//         toast.success(data.message); // Show success message
//       } catch (error) {
//         setVerificationStatus("error");
//         setMessage(
//           error.response?.data?.message || "Email verification failed"
//         );
//         toast.error(
//           error.response?.data?.message || "Email verification failed"
//         ); // Show error message
//       }
//     };

//     if (token) {
//       verifyEmail();
//     } else {
//       setVerificationStatus("error");
//       setMessage("Invalid verification link - no token provided");
//       toast.error("Invalid verification link"); // Invalid token message
//     }
//   }, [token]);

//   if (verificationStatus === "loading") {
//     return <Loader />; // Show loading indicator while verifying
//   }

//   return (
//     <>
//       <MetaData title="Email Verification" />
//       <div className="auth-container">
//         <div className="auth-content">
//           <div className="auth-card">
//             <div className="auth-header">
//               {verificationStatus === "success" ? (
//                 <FiCheckCircle
//                   className="verification-icon"
//                   style={{ color: "#10b981", fontSize: "4rem" }}
//                 />
//               ) : (
//                 <FiXCircle
//                   className="verification-icon"
//                   style={{ color: "#ef4444", fontSize: "4rem" }}
//                 />
//               )}
//               <h2 className="auth-title">
//                 {verificationStatus === "success"
//                   ? "Email Verified!"
//                   : "Verification Failed"}
//               </h2>
//               <p className="auth-subtitle">{message}</p>
//             </div>
//             <div className="verification-message">
//               {verificationStatus === "success" ? (
//                 <div>
//                   <p>Your email has been successfully verified!</p>
//                   <p>
//                     You can now login to your account and enjoy all features.
//                   </p>
//                 </div>
//               ) : (
//                 <div>
//                   <p>The verification link may have expired or is invalid.</p>
//                   <p>
//                     Please try registering again or contact support if the
//                     problem persists.
//                   </p>
//                 </div>
//               )}
//             </div>
//             <div className="verification-actions">
//               <Link to="/login" className="auth-button">
//                 {verificationStatus === "success"
//                   ? "Login Now"
//                   : "Back to Login"}
//               </Link>
//               {verificationStatus === "error" && (
//                 <Link to="/register" className="auth-button-secondary">
//                   Register Again
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="auth-image">
//           {/* Background image will be applied via CSS */}
//         </div>
//       </div>
//       <ToastContainer
//         position="bottom-center"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </>
//   );
// };

// export default EmailVerification;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import Loader from "../../more/Loader";
import MetaData from "../../more/MetaData";

const EmailVerification = () => {
  const { token } = useParams(); // Fetch the token from the URL params
  const [verificationStatus, setVerificationStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const { data } = await axios.get(`/api/v2/verify-email/${token}`); // Call backend to verify email
        setVerificationStatus("success");
        setMessage(data.message); // Success message from backend
        toast.success(data.message); // Show success message
      } catch (error) {
        setVerificationStatus("error");
        // Ensure the error message is coming from the response data
        setMessage(
          error.response?.data?.message || "Email verification failed"
        );
        toast.error(
          error.response?.data?.message || "Email verification failed"
        ); // Show error message
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setVerificationStatus("error");
      setMessage("Invalid verification link - no token provided");
      toast.error("Invalid verification link"); // Invalid token message
    }
  }, [token]);

  if (verificationStatus === "loading") {
    return <Loader />; // Show loading indicator while verifying
  }

  return (
    <>
      <MetaData title="Email Verification" />
      <div className="auth-container">
        <div className="auth-content">
          <div className="auth-card">
            <div className="auth-header">
              {verificationStatus === "success" ? (
                <FiCheckCircle
                  className="verification-icon"
                  style={{ color: "#10b981", fontSize: "4rem" }}
                />
              ) : (
                <FiXCircle
                  className="verification-icon"
                  style={{ color: "#ef4444", fontSize: "4rem" }}
                />
              )}
              <h2 className="auth-title">
                {verificationStatus === "success"
                  ? "Email Verified!"
                  : "Verification Failed"}
              </h2>
              <p className="auth-subtitle">{message}</p>
            </div>
            <div className="verification-message">
              {verificationStatus === "success" ? (
                <div>
                  <p>Your email has been successfully verified!</p>
                  <p>
                    You can now login to your account and enjoy all features.
                  </p>
                </div>
              ) : (
                <div>
                  <p>The verification link may have expired or is invalid.</p>
                  <p>
                    Please try registering again or contact support if the
                    problem persists.
                  </p>
                </div>
              )}
            </div>
            <div className="verification-actions">
              <Link to="/login" className="auth-button">
                {verificationStatus === "success"
                  ? "Login Now"
                  : "Back to Login"}
              </Link>
              {verificationStatus === "error" && (
                <Link to="/register" className="auth-button-secondary">
                  Register Again
                </Link>
              )}
            </div>
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
  );
};

export default EmailVerification;
