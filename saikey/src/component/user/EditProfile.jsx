// import React, { useState, useEffect, } from "react";
// import "./EditProfile.css";
// import MailOutlineIcon from "@material-ui/icons/MailOutline";
// import FaceIcon from "@material-ui/icons/Face";
// import { useDispatch, useSelector } from "react-redux";
// import { clearErrors, loadUser, updateProfile } from "../../actions/UserActions";
// import Loading from "../../more/Loader";
// import MetaData from "../../more/MetaData";
// import { UPDATE_PROFILE_RESET } from "../../constants/UserConstants";
// import { ToastContainer, toast } from "react-toastify";

// const EditProfile = ({ history }) => {
//   const dispatch = useDispatch();

//   const { user } = useSelector((state) => state.user);

//   const { error, isUpdated, loading } = useSelector((state) => state.profile);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [avatar, setAvatar] = useState();
//   const [avatarPreview, setAvatarPreview] = useState("/profile.png");

//   const updateProfileSubmit = (e) => {
//     e.preventDefault();

//     const myForm = new FormData();

//     myForm.set("name", name);
//     myForm.set("email", email);
//     myForm.set("avatar", avatar);
//     dispatch(updateProfile(myForm));
//   };

//   const updateProfileDataChange = (e) => {
//     const reader = new FileReader();

//     reader.onload = () => {
//       if (reader.readyState === 2) {
//         setAvatarPreview(reader.result);
//         setAvatar(reader.result);
//       }
//     };
//     reader.readAsDataURL(e.target.files[0]);
//   };

//   useEffect(() => {
//     if (user) {
//       setName(user.name);
//       setEmail(user.email);
//       setAvatarPreview(user.avatar.url);
//     }

//     if (error) {
//       toast.error(error);
//       dispatch(clearErrors());
//     }

//     if (isUpdated) {
//       toast.success("Profile updated successfully");
//       dispatch(loadUser());

//       history.push("/me");

//       dispatch({
//         type: UPDATE_PROFILE_RESET,
//       });
//     }
//   }, [dispatch, error, alert, history, isUpdated, user]);

//   return (
//     <>
//       {loading ? (
//         <Loading />
//       ) : (
//         <>
//           <MetaData title="Update Profile" />
//           <div className="updateProfileContainer">
//             <div className="updateProfileBox">
//               <h2 className="updateProfileHeading">Update Profile</h2>

//               <form
//                 className="updateProfileForm"
//                 encType="multipart/form-data"
//                 onSubmit={updateProfileSubmit}
//               >
//                 <div className="updateProfileName">
//                   <FaceIcon />
//                   <input
//                     type="text"
//                     placeholder="Name"
//                     required
//                     name="name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </div>
//                 <div className="updateProfileEmail">
//                   <MailOutlineIcon />
//                   <input
//                     type="email"
//                     placeholder="Email"
//                     required
//                     name="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>

//                 <div id="updateProfileImage">
//                   <img src={avatarPreview} alt="Avatar Preview" />
//                   <input
//                     type="file"
//                     name="avatar"
//                     accept="image/*"
//                     onChange={updateProfileDataChange}
//                   />
//                 </div>
//                 <input
//                   type="submit"
//                   value="Update"
//                   className="updateProfileBtn"
//                 />
//               </form>
//             </div>
//           </div>
//         </>
//       )}
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

// export default EditProfile;


import React, { useState, useEffect } from "react";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../actions/UserActions";
import Loading from "../../more/Loader";
import MetaData from "../../more/MetaData";
import { UPDATE_PROFILE_RESET } from "../../constants/UserConstants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Home/Header.jsx";
const EditProfile = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Profile updated successfully");
      dispatch(loadUser());
      history.push("/me");
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, history, isUpdated, user]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Update Profile" />
          <Header/>
          <div
            style={{
              maxWidth: "500px",
              margin: "50px auto",
              padding: "30px",
              background: "#fff",
              borderRadius: "16px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                fontSize: "1.8rem",
                fontWeight: "600",
                marginBottom: "25px",
              }}
            >
              Update Profile
            </h2>

            <form onSubmit={updateProfileSubmit} encType="multipart/form-data">
              {/* Name Field */}
              <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <FaceIcon style={{ marginRight: "10px", color: "#5e30c9" }} />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    fontSize: "1rem",
                  }}
                />
              </div>

              {/* Email Field */}
              <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <MailOutlineIcon style={{ marginRight: "10px", color: "#5e30c9" }} />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    fontSize: "1rem",
                  }}
                />
              </div>

              {/* Avatar Upload */}
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "25px",
                }}
              >
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: "10px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={updateProfileDataChange}
                  style={{
                    display: "block",
                    margin: "0 auto",
                    padding: "8px",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              {/* Submit Button */}
              <input
                type="submit"
                value="Update"
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#5e30c9",
                  color: "#fff",
                  fontSize: "1rem",
                  fontWeight: "600",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#44208a")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#5e30c9")}
              />
            </form>
          </div>
        </>
      )}
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

export default EditProfile;
