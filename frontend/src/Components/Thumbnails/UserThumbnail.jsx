import React from "react";
import { FaUser } from "react-icons/fa6";

const UserThumbnail = ({ photoUrl }) => {
  return (
    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 overflow-hidden">
      {photoUrl ? (
        <img
          src={`http://127.0.0.1:8000${photoUrl}`}
          alt="User"
          className="w-full h-full object-cover"
        />
      ) : (
        <FaUser className="w-6 h-6 text-gray-600" />
      )}
    </div>
  );
};

export default UserThumbnail;
