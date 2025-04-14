import React from "react";
import { FaUser } from "react-icons/fa";

const DottedUserBox = ({ width = "304px", height = "250px" }) => {
  return (
    <div
      className="border border-dashed border-gray-400 rounded-lg   flex items-center justify-center overflow-hidden bg-[#EAEAEA]"
      style={{ width, height }}
    >
      <FaUser className="w-full h-full object-cover p-2 text-[#C2C2C2]" />
    </div>
  );
};

export default DottedUserBox;
