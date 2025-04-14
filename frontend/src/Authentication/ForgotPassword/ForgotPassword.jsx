import { Link, useNavigate } from "react-router-dom";
import EmailInputComponent from "../../Components/FormComponent/EmailInputComponent";
import { FiChevronLeft } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearState, requestOtp, setEmail } from "../../redux/slices/forgotPasswordSlice/forgotPasswordSlice";
import MessageBox from "../../Components/MessageBox/MessageBox";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, error, loading } = useSelector((state) => state.forgotPassword);
  const [email, setEmailState] = useState("");
  const [emailInlineError, setEmailInlineError] = useState(""); // Inline error state for empty email.
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [messageBoxContent, setMessageBoxContent] = useState({ message: "", error: "" });

  // Show MessageBox when backend returns a message or error.
  useEffect(() => {
    if (message || error) {
      setMessageBoxContent({ message, error });
      setShowMessageBox(true);
    }
  }, [message, error, dispatch]);

  const clearMessageBox = () => {
    setShowMessageBox(false);
    dispatch(clearState());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Inline validation: if email is empty, show an inline error below the field.
    if (!email.trim()) {
      setEmailInlineError("Email is required");
      return;
    }
    setEmailInlineError("");

    // Validate the email format.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setMessageBoxContent({ message: "", error: "Please enter a valid email address." });
      setShowMessageBox(true);
      return;
    }
    // Dispatch the request OTP action.
    dispatch(requestOtp(email)).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        setMessageBoxContent({ message: response.payload.message || "OTP sent to your email", error: "" });
        dispatch(setEmail(email));
        navigate("/verifyCode");
      } else {
        // Backend error such as unknown email is shown via MessageBox.
        setMessageBoxContent({ message: "", error: response.payload?.error || "Failed to send OTP. Please try again." });
        setShowMessageBox(true);
      }
    });
  };

  return (
    <div className="container mx-auto my-auto mt-[50px] mb-[20px]">
      {showMessageBox && (
        <MessageBox
          message={messageBoxContent.message}
          error={messageBoxContent.error}
          clearMessage={clearMessageBox}
        />
      )}
      <div className="login-logo">
        <img
          src="/logo.svg"
          alt="Banner"
          className="w-full h-full rounded-lg"
          style={{ width: "244px", height: "63px" }}
        />
      </div>
      <div className="flex justify-center">
        <div className="login-box py-[50px] w-[512px]">
          <div className="text-left mb-0">
            <Link to="/login">
              <p className="flex items-center">
                <FiChevronLeft className="font-[800] text-[25px] pr-[2px]" />
                Back to login
              </p>
            </Link>
            <h2 className="text-[44px] font-[600] py-[16px]">Forgot your password?</h2>
            <p className="pb-[15px]">
              Don’t worry, happens to all of us. Enter your email below to recover your password.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <EmailInputComponent
              name="email"
              label={
                <span>
                  Email <span className="text-red-500 text-[20px]">*</span>
                </span>
              }
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmailState(e.target.value);
                // Clear inline error when user starts typing.
                if (emailInlineError) setEmailInlineError("");
              }}
            />
            {/* Inline error message below the email field */}
            {emailInlineError && (
              <div style={{ color: "red", fontSize: "0.9rem", textAlign: "left" }}>
                {emailInlineError}
              </div>
            )}
            <button
              type="submit"
              className="submit-btn bg-[#3D9D9B] w-full h-12 text-white rounded mt-4"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
        <div className="login-banner pl-[70px]">
          <img
            src="/login_banner.png"
            alt="Banner"
            className="w-full h-full rounded-[20px]"
            style={{ width: "470px", height: "613px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
