import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PasswordInputComponents from "../../Components/FormComponent/PasswordInputComponents";
import CheckboxComponent from "../../Components/FormComponent/CheckboxComponent";
import {
  loginUser,
  checkUserStatus,
  setPasswordUser
} from "../../api/authApi/authApi";
import "./Login.css";
import TextInputComponent from "../../Components/FormComponent/TextInputComponent";
import MessageBox from "../../Components/MessageBox/MessageBox";

const Login = () => {
  const [activeTab, setActiveTab] = useState(1);
  // "authenticator" can be a username, email, or contact number.
  const [authenticator, setAuthenticator] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [userId, setUserId] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  // States for messages to be displayed via MessageBox in tabs 1 & 3
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { isAuthenticated } = useSelector((state) => state.auth);

  // NEW: Inline error states for Set Password tab (activeTab 2)
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // NEW: Inline error state for authenticator (Tab 1) and login password (Tab 3)
  const [authenticatorError, setAuthenticatorError] = useState("");
  const [loginPasswordInlineError, setLoginPasswordInlineError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Redirect to dashboard
    }
  }, [isAuthenticated, navigate]);

  // Helper to convert error objects into a string (for tabs 1 & 3)
  const parseError = (err) => {
    if (typeof err === "object") {
      let messages = [];
      for (let key in err) {
        const value = Array.isArray(err[key]) ? err[key].join(", ") : err[key];
        messages.push(`${key}: ${value}`);
      }
      return messages.join(", ");
    }
    return err;
  };

  useEffect(() => {
    // Retrieve the entire entered credential from localStorage
    const savedAuthenticator = localStorage.getItem("authenticator");
    const savedPassword = localStorage.getItem("loginPassword");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedRememberMe) {
      setAuthenticator(savedAuthenticator || "");
      setLoginPassword(savedPassword || "");
      setRememberMe(savedRememberMe);
    }
  }, []);

  // Tab 1: Check user status
  const handleCheckStatus = async (e) => {
    e.preventDefault();
    // Inline validation: if authenticator field is empty, show inline error below the field.
    if (!authenticator.trim()) {
      setAuthenticatorError("Authenticator is required.");
      return;
    }
    setAuthenticatorError("");

    // Await the dispatch so the result is available
    const result = await dispatch(checkUserStatus(authenticator));
    if (result && result.error) {
      // If credentials are provided but backend returns an error, use MessageBox.
      setErrorMessage(parseError(result.error));
      return;
    }
    if (result) {
      if (result.is_first_login) {
        setUserId(result.user_id);
        setActiveTab(2); // Move to set password tab
      } else {
        setActiveTab(3); // Move to login tab
      }
    }
  };

  // Updated handler for Tab 2 to show inline errors
  const handleSetPassword = async (e) => {
    e.preventDefault();
    let valid = true;

    // Client-side validations:
    if (!oldPassword) {
      setOldPasswordError("Old Password is required.");
      valid = false;
    }
    if (!newPassword) {
      setNewPasswordError("New Password is required.");
      valid = false;
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your new password.");
      valid = false;
    }
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      setConfirmPasswordError("New password and confirmation do not match!");
      valid = false;
    }
    if (!valid) {
      return;
    }

    // Clear inline errors if validations pass
    setOldPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");

    const result = await dispatch(
      setPasswordUser(userId, newPassword, oldPassword, confirmPassword)
    );
    if (result && result.error) {
      // If API returns error as an object, show each error below its field
      if (typeof result.error === "object") {
        if (result.error.old_password) {
          setOldPasswordError(result.error.old_password.join(", "));
        }
        if (result.error.new_password) {
          setNewPasswordError(result.error.new_password.join(", "));
        }
        if (result.error.confirm_password) {
          setConfirmPasswordError(result.error.confirm_password.join(", "));
        }
      } else {
        // Otherwise, assign a general error to the confirm password field
        setConfirmPasswordError(parseError(result.error));
      }
      return;
    }
    setSuccessMessage("Password changed successfully!");
    setActiveTab(3);
  };

  // Tab 3: Login
  const handleLogin = async (e) => {
    e.preventDefault();
    // Inline validation: if login password is empty, show inline error below the field.
    if (!loginPassword.trim()) {
      setLoginPasswordInlineError("Password is required.");
      return;
    }
    setLoginPasswordInlineError("");

    const login_type = "org";
    // Await the login action to get a response or error
    const result = await dispatch(
      loginUser(authenticator, loginPassword, navigate, login_type)
    );
    if (result && result.error) {
      // Show backend error using MessageBox
      setErrorMessage(parseError(result.error));
    }

    // Save the authenticator if remember me is checked.
    if (rememberMe) {
      localStorage.setItem("authenticator", authenticator);
      localStorage.setItem("loginPassword", loginPassword);
      localStorage.setItem("rememberMe", true);
    } else {
      localStorage.removeItem("authenticator");
      localStorage.removeItem("loginPassword");
      localStorage.removeItem("rememberMe");
    }
  };

  // Clear both error and success messages (used in tabs 1 & 3)
  const clearMessage = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <div className="container mx-auto my-auto mt-[50px] mb-[20px]">
      <div className="login-logo">
        <img
          src="/logo.svg"
          alt="Banner"
          className="w-full h-full rounded-lg"
          style={{ width: "244px", height: "63px" }}
        />
      </div>
      <div className="flex justify-center">
        <div className="login-box py-[50px]">
          <div className="login-title">
            <h2 className="text-[44px] font-[600]">Login</h2>
            <p>Login to access your Estate Link account</p>
          </div>
          {activeTab === 1 && (
            <form onSubmit={handleCheckStatus}>
              <TextInputComponent
                label="User Name / Email / Contact Number"
                name="usernameOrEmail"
                placeholder="Enter your Username, Email or Contact Number"
                value={authenticator}
                onChange={(e) => {
                  setAuthenticator(e.target.value);
                  setAuthenticatorError("");
                }}
              />
              {/* Inline error for Tab 1 (left aligned) */}
              {authenticatorError && (
                <div style={{ color: "red", fontSize: "0.9rem", textAlign: "left" }}>
                  {authenticatorError}
                </div>
              )}
              <div className="login-options pb-[25px] pt-[0px] flex justify-between">
                <div className="login-remember flex items-center">
                  <CheckboxComponent
                    name="rememberMe"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label htmlFor="rememberMe" className="pt-[10px] ml-1">
                    Remember Me
                  </label>
                </div>
                <div className="login-remember flex items-center text-error">
                  <Link to="/forgotPassword">
                    <p>Forgot Password</p>
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                className="submit-btn bg-[#3D9D9B] w-full h-12 text-white rounded"
                disabled={isLoading}
              >
                Next
              </button>
            </form>
          )}
          {activeTab === 2 && (
            <form onSubmit={handleSetPassword}>
              <PasswordInputComponents
                label="Old Password"
                name="oldPassword"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                  setOldPasswordError("");
                }}
              />
              {oldPasswordError && (
                <div style={{ color: "red", fontSize: "0.9rem", textAlign: "left" }}>
                  {oldPasswordError}
                </div>
              )}
              <PasswordInputComponents
                label="New Password"
                name="newPassword"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setNewPasswordError("");
                }}
              />
              {newPasswordError && (
                <div style={{ color: "red", fontSize: "0.9rem", textAlign: "left" }}>
                  {newPasswordError}
                </div>
              )}
              <PasswordInputComponents
                label="Re-type New Password"
                name="confirmPassword"
                placeholder="Re-type New Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setConfirmPasswordError("");
                }}
              />
              {confirmPasswordError && (
                <div style={{ color: "red", fontSize: "0.9rem", textAlign: "left" }}>
                  {confirmPasswordError}
                </div>
              )}

              <div className="login-options pb-[25px] pt-[0px] flex justify-between">
                <div className="login-remember flex items-center">
                  <CheckboxComponent name="rememberMe" />
                  <label htmlFor="rememberMe" className="pt-[10px] ml-1">
                    Remember Me
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="submit-btn bg-[#3D9D9B] w-full h-12 text-white rounded"
                disabled={isLoading}
              >
                Set Password
              </button>
            </form>
          )}
          {activeTab === 3 && (
            <form onSubmit={handleLogin}>
              <PasswordInputComponents
                label="Password"
                name="loginPassword"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                  setLoginPasswordInlineError("");
                }}
              />
              {/* Inline error for Tab 3 (left aligned) */}
              {loginPasswordInlineError && (
                <div style={{ color: "red", fontSize: "0.9rem", textAlign: "left" }}>
                  {loginPasswordInlineError}
                </div>
              )}
              <div className="login-options pb-[25px] pt-[0px] flex justify-between">
                <div className="login-remember flex items-center">
                  <CheckboxComponent
                    name="rememberMe"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label htmlFor="rememberMe" className="pt-[10px] ml-1">
                    Remember Me
                  </label>
                </div>
                <div className="login-remember flex items-center text-error">
                  <Link to="/forgotPassword">
                    <p>Forgot Password</p>
                  </Link>
                </div>
              </div>
              <button
                type="submit"
                className="submit-btn bg-[#3D9D9B] w-full h-12 text-white rounded"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
          )}
        </div>
        <div className="login-banner ml-[70px] bg-[#D1EDEE] rounded-[20px]">
          <img
            src="/login_banner.png"
            alt="Banner"
            className="w-full h-full rounded-[20px]"
            style={{ width: "470px" }}
          />
        </div>
      </div>
      {/* MessageBox for backend messages (tabs 1 & 3) */}
      <MessageBox
        message={successMessage}
        error={errorMessage}
        clearMessage={clearMessage}
      />
    </div>
  );
};

export default Login;
