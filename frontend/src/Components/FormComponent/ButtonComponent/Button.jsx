import React from "react";
//  Created By Firoj Hasan
const Button = ({
  size,
  variant,
  children,
  onClick,
  icon: Icon,
  iconPosition = "left"
}) => {
  let sizeClass;
  let variantClass;

  // Define size classes
  switch (size) {
    case "small":
      sizeClass = "py-[6px] px-5  text-sm flex items-center";
      break;
    case "medium":
      sizeClass = "py-2 px-6 w-full text-base";
      break;
    case "large":
      sizeClass = "py-4 px-8 w-full text-lg";
      break;
    case "active":
      sizeClass = "py-1 px-1 text-sm";
      break;
    default:
      sizeClass = "py-3 px-6 text-base";
  }

  // Define variant classes
  switch (variant) {
    case "transparent":
      variantClass = "bg-transparent text-primary border border-[#3D9D9B]  ";
      break;
    case "black":
      variantClass = "bg-transparent text-[black] border border-[#0000004D]  ";
      break;
    case "red":
      variantClass = "bg-[red] text-[white]";
      break;
    case "filter":
      variantClass = "bg-transparent text-primary border border-gray-200   ";
      break;
    default:
      variantClass = "bg-primary text-white hover:bg-[#348785]";
  }

  return (
    <button
      type="button"
      className={`rounded-8 ${sizeClass} ${variantClass} transition-all duration-300`}
      onClick={onClick}
    >
      <span className="flex items-center">
        {Icon && iconPosition === "left" && <Icon className="mr-2" />}
        {children}
        {Icon && iconPosition === "right" && <Icon className="ml-2" />}
      </span>
    </button>
  );
};

export default Button;
