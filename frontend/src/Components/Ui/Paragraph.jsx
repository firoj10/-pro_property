import React from "react";

export const Paragraph = ({ className = "", children, ...props }) => {
  return (
    <p className={`text-base ${className}`} {...props}>
      {children}
    </p>
  )
}
