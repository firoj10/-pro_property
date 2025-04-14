import React from "react";

const PageContainer = ({ children, className = "" }) => {
  return (
    <div className={`container py-6 h-full  ${className}`}>{children}</div>
  );
};

export default PageContainer;
