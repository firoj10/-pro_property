import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NotAuthorized = () => {
  const navigate = useNavigate();
  // Check the Redux auth state instead of localStorage.
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = Boolean(user);

  const handleRedirect = () => {
    if (isAuthenticated) {
      navigate("/member-list");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center animate-fadeIn">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-700 mb-6">
          You do not have the required permissions to view this page.
        </p>
        <button
          onClick={handleRedirect}
          className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Go back to Home
        </button>
      </div>
    </div>
  );
};

export default NotAuthorized;
