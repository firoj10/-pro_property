import React from "react";

const Status = ({ text, color = "primary" }) => {
  const colors = {
    primary: "bg-subprimary text-primary",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
    yellow: "bg-yellow-100 text-yellow-700",
    blue: "bg-blue-100 text-blue-700"
    // Add more colors as needed
  };

  return (
    <span
      className={`p-2 rounded-8 font-bold ${colors[color] || colors.primary}`}
    >
      {text}
    </span>
  );
};

export default Status;
