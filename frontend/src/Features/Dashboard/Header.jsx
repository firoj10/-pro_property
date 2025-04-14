import React, { useEffect } from "react";



const Header = ({ toggleSidebar }) => {
 
  return (
    <header className="bg-white border-b-2 border-gray-300 px-6 py-5 shadow-md flex justify-between items-center">
      {/* Left Section: Sidebar Toggle & Logo */}
      <div className="flex items-center">
        <button
          className="lg:hidden px-4 focus:outline-none"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
          aria-expanded="false"
          aria-controls="sidebar-menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 40 40"
            strokeWidth={2}
            stroke="currentColor"
            className="w-9 h-9 text-[#3D9D9B]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <img
          src="/estate_link.png"
          alt="Estate Link Logo"
          className="w-[120px] h-auto"
          loading="lazy"
        />
      </div>

      <div className="flex items-center space-x-3">
        {/* Search Icon */}
        <button
          className="w-10 h-10 border border-[#3D9D9B] rounded flex justify-center items-center"
          aria-label="Search"
        >
          <img
            src="/search-head.png"
            className="w-6"
            alt="Search Icon"
            loading="lazy"
          />
        </button>

        {/* Notifications Icon */}
        <button
          className="w-10 h-10 border border-[#3D9D9B] rounded flex justify-center items-center"
          aria-label="Notifications"
        >
          <img
            src="/bell.png"
            className="w-6"
            alt="Notification Bell"
            loading="lazy"
          />
        </button>

        
          <button
            onClick={() => navigate("/login")}
            className="text-[#3D9D9B] border border-[#3D9D9B] px-4 py-1 rounded"
          >
            Login
          </button>
     
      </div>
    </header>
  );
};

export default Header;
