// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import Header from "../Home/Header";
// import MetaData from "../../more/MetaData";
// import Loading from "../../more/Loader";
// import "./Profile.css";
// import Footer from "../../more/Footer";
// import BottomTab from "../../more/BottomTab";

// const Profile = ({ history }) => {
//   const { user, loading, isAuthenticated } = useSelector((state) => state.user);

//   useEffect(() => {
//     if (isAuthenticated === false) {
//       history.push("/login");
//     }
//   }, [history, isAuthenticated]);

//   return (
//     <>
//       {loading ? (
//         <Loading />
//       ) : (
//         <>
//           <Header />
//           <div>
//             <MetaData title={`${user.name}'s profile`} />
//             <div className="profileContainer">
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   flexDirection: "column",
//                 }}
//               >
//                 <h1
//                   style={{
//                     fontFamily: "Poppins,sans-serif",
//                     opacity: "1",
//                     fontSize: "2vmax",
//                   }}
//                 >
//                   My Profile
//                 </h1>
//                 <img
//                   src={user.avatar.url}
//                   alt={user.name}
//                   className="profile__img"
//                 />
//                 <Link to="/me/update/profile" className="edit__profile">
//                   Edit Profile
//                 </Link>
//               </div>
//             </div>
//             <div className="information">
//               <div className="middle">
//                 <div className="info">
//                   <h4
//                     style={{
//                       padding: "0px 5px",
//                     }}
//                   >
//                     Full Name:
//                   </h4>
//                   <p>{user.name}</p>
//                 </div>
//                 <div className="info">
//                   <h4
//                     style={{
//                       padding: "0px 5px",
//                     }}
//                   >
//                     Email:
//                   </h4>
//                   <p>{user.email}</p>
//                 </div>
//                 <div className="info">
//                   <h4
//                     style={{
//                       padding: "0px 5px",
//                     }}
//                   >
//                     Joined On:
//                   </h4>
//                   <p>{String(user.createdAt).substr(0, 10)}</p>
//                 </div>

//                 <div className="change__info">
//                   <Link to="/orders" className="settings">
//                     My Orders
//                   </Link>
//                   <Link to="/me/update" className="settings">
//                     Change Password
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <Footer />
//           <BottomTab />
//         </>
//       )}
//     </>
//   );
// };  

// export default Profile;
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../Home/Header";
import MetaData from "../../more/MetaData";
import Loading from "../../more/Loader";
import Footer from "../../more/Footer";
import BottomTab from "../../more/BottomTab";

const Profile = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <MetaData title={`${user.name}'s profile`} />
          <div
            style={{
              maxWidth: "600px",
              margin: "40px auto",
              padding: "30px",
              borderRadius: "16px",
              background: "#fff",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
              fontFamily: "'Poppins', sans-serif",
              color: "#333",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginBottom: "30px",
              }}
            >
              <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>My Profile</h1>
              <img
                src={user.avatar.url}
                alt={user.name}
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  marginBottom: "15px",
                }}
              />
              <br />
              <Link
                to="/me/update/profile"
                style={{
                  display: "inline-block",
                  marginTop: "8px",
                  padding: "8px 18px",
                  backgroundColor: "#5e30c9",
                  color: "#fff",
                  borderRadius: "20px",
                  textDecoration: "none",
                  fontWeight: "500",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#4520a3")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#5e30c9")
                }
              >
                Edit Profile
              </Link>
            </div>

            <div style={{ marginTop: "20px" }}>
              <div style={{ marginBottom: "16px" }}>
                <h4 style={{ margin: "0", color: "#888" }}>Full Name</h4>
                <p style={{ margin: "5px 0", fontSize: "1rem", fontWeight: "500" }}>{user.name}</p>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <h4 style={{ margin: "0", color: "#888" }}>Email</h4>
                <p style={{ margin: "5px 0", fontSize: "1rem", fontWeight: "500" }}>{user.email}</p>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <h4 style={{ margin: "0", color: "#888" }}>Joined On</h4>
                <p style={{ margin: "5px 0", fontSize: "1rem", fontWeight: "500" }}>
                  {String(user.createdAt).substr(0, 10)}
                </p>
              </div>

              <div style={{ marginTop: "30px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
                <Link
                  to="/orders"
                  style={{
                    flex: 1,
                    minWidth: "120px",
                    padding: "10px 20px",
                    textAlign: "center",
                    backgroundColor: "#197ef3",
                    color: "#fff",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  My Orders
                </Link>

                <Link
                  to="/me/update"
                  style={{
                    flex: 1,
                    minWidth: "120px",
                    padding: "10px 20px",
                    textAlign: "center",
                    backgroundColor: "#ff9800",
                    color: "#fff",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  Change Password
                </Link>
              </div>
            </div>
          </div>

          <Footer />
          <BottomTab />
        </>
      )}
    </>
  );
};

export default Profile;
