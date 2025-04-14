import React from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`bg-white h-full shadow-sm transition-transform duration-300 ${isOpen ? 'transform translate-x-0' : 'transform -translate-x-full'}`}
      style={{ width: '250px' }}
    >
      <button onClick={toggleSidebar} className="text-xl p-4">
        Close
      </button>
      <ul className="space-y-4 text-center py-4">
        <li>
          <span>Dashboard</span>
        </li>
        <li>
          <span>Profile</span>
        </li>
        <li>
          <span>Settings</span>
        </li>
        <li>
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
