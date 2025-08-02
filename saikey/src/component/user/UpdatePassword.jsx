import React, { useState, useEffect } from "react";
import Loading from "../../more/Loader";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../more/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { clearErrors, updatePassword } from "../../actions/UserActions";
import { UPDATE_PASSWORD_RESET } from "../../constants/UserConstants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Home/Header.jsx";

const UpdatePassword = ({ history }) => {
  const dispatch = useDispatch();
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("passwordConfirm", confirmPassword);
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Password Updated Successfully");
      history.push("/me");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, history, isUpdated]);

  return (
    <>
      <MetaData title="Change Password" />
      <Header/>
      {loading ? (
        <Loading />
      ) : (
        <div
          style={{
            maxWidth: "480px",
            margin: "60px auto",
            padding: "30px",
            borderRadius: "12px",
            background: "#fff",
            boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "1.8rem",
              fontWeight: "600",
              color: "#333",
              marginBottom: "25px",
            }}
          >
            Update Password
          </h2>

          <form onSubmit={updatePasswordSubmit}>
            {[
              {
                icon: <VpnKeyIcon style={{ color: "#5e30c9" }} />,
                value: oldPassword,
                setValue: setOldPassword,
                placeholder: "Old Password",
              },
              {
                icon: <LockOpenIcon style={{ color: "#5e30c9" }} />,
                value: newPassword,
                setValue: setNewPassword,
                placeholder: "New Password",
              },
              {
                icon: <LockIcon style={{ color: "#5e30c9" }} />,
                value: confirmPassword,
                setValue: setConfirmPassword,
                placeholder: "Confirm Password",
              },
            ].map((field, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  marginBottom: "20px",
                }}
              >
                {field.icon}
                <input
                  type="password"
                  placeholder={field.placeholder}
                  required
                  value={field.value}
                  onChange={(e) => field.setValue(e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    flex: 1,
                    marginLeft: "10px",
                    fontSize: "1rem",
                    fontFamily: "inherit",
                  }}
                />
              </div>
            ))}

            <input
              type="submit"
              value="Change"
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#5e30c9",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#452095")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#5e30c9")}
            />
          </form>
        </div>
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        pauseOnHover
        hideProgressBar={false}
        draggable
      />
    </>
  );
};

export default UpdatePassword;
