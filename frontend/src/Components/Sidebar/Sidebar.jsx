import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBuilding, FaUsers, FaLayerGroup, FaChartBar, FaAngleDown, FaAngleRight } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const Sidebar = ({ isSidebarOpen }) => {
  const [isTowerMenuOpen, setIsTowerMenuOpen] = useState(false);
  const [isMemberMenuOpen, setIsMemberMenuOpen] = useState(false);
  const [isCommunityMenuOpen, setIsCommunityMenuOpen] = useState(false);

  const activeClass = "bg-primary text-white";
  const inactiveClass = "text-primary hover:bg-primary hover:text-white";

  return (
    <aside className={`w-68 min-h-screen fixed transition-all ease-in-out duration-300 ${isSidebarOpen ? "block" : "hidden"} Text`}>
      <ul className="space-y-4 mt-6">
        {/* Dashboard */}
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `flex items-center gap-3 p-2 rounded cursor-pointer transition-colors ${isActive ? activeClass : inactiveClass}`}
          >
            <MdDashboard className="w-5 h-5" /> Dashboard
          </NavLink>
        </li>

        {/* Tower Management */}
        <li
          className="flex items-center justify-between p-2 rounded cursor-pointer hover:bg-primary text-primary hover:text-white transition-colors"
          onClick={() => setIsTowerMenuOpen(!isTowerMenuOpen)}
        >
          <div className="flex items-center gap-3">
            <FaUsers /> Member Management
          </div>
          {isTowerMenuOpen ? <FaAngleDown /> : <FaAngleRight />}
        </li>
        {isTowerMenuOpen && (
          <ul className="ml-6 space-y-2">
            <li>
              <NavLink
                to="/member-list"
                className={({ isActive }) => `block p-2 rounded cursor-pointer transition-colors ${isActive ? activeClass : inactiveClass}`}
              >
                Organization Members
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/roles"
                className={({ isActive }) => `block p-2 rounded cursor-pointer transition-colors ${isActive ? activeClass : inactiveClass}`}
              >
                Role Management
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/groups"
                className={({ isActive }) => `block p-2 rounded cursor-pointer transition-colors ${isActive ? activeClass : inactiveClass}`}
              >
                Groups Management
              </NavLink>
            </li>
          </ul>
        )}

        {/* Tower & Unit Management */}
        <li
          className="flex items-center justify-between p-2 rounded cursor-pointer hover:bg-primary text-primary hover:text-white transition-colors"
          onClick={() => setIsMemberMenuOpen(!isMemberMenuOpen)}
        >
          <div className="flex items-center gap-3">
            <FaBuilding /> Tower & Unit Management
          </div>
          {isMemberMenuOpen ? <FaAngleDown /> : <FaAngleRight />}
        </li>
        {isMemberMenuOpen && (
          <ul className="ml-6 space-y-2">
            <li>
              <NavLink
                to="/tower-units"
                className={({ isActive }) => `block p-2 rounded cursor-pointer transition-colors ${isActive ? activeClass : inactiveClass}`}
              >
                Tower & Unit Management
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/community"
                className={({ isActive }) => `block p-2 rounded cursor-pointer transition-colors ${isActive ? activeClass : inactiveClass}`}
              >
                Community Management
              </NavLink>
            </li>
          </ul>
        )}

        {/* Community Management */}
        <li
          className="flex items-center justify-between p-2 rounded cursor-pointer hover:bg-primary text-primary hover:text-white transition-colors"
          onClick={() => setIsCommunityMenuOpen(!isCommunityMenuOpen)}
        >
          <div className="flex items-center gap-2">
            <FaLayerGroup /> Community Management
          </div>
          {isCommunityMenuOpen ? <FaAngleDown /> : <FaAngleRight />}
        </li>
        {isCommunityMenuOpen && (
          <ul className="ml-6 space-y-2">
            <li>
              <NavLink
                to="/community/sub1"
                className={({ isActive }) => `block p-2 rounded cursor-pointer transition-colors ${isActive ? activeClass : inactiveClass}`}
              >
                Community Sub Menu 1
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/community/sub2"
                className={({ isActive }) => `block p-2 rounded cursor-pointer transition-colors ${isActive ? activeClass : inactiveClass}`}
              >
                Community Sub Menu 2
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/community/sub3"
                className={({ isActive }) => `block p-2 rounded cursor-pointer transition-colors ${isActive ? activeClass : inactiveClass}`}
              >
                Community Sub Menu 3
              </NavLink>
            </li>
          </ul>
        )}

        {/* Reports */}
        <li>
          <NavLink
            to="/reports"
            className={({ isActive }) => `flex items-center gap-3 p-2 rounded cursor-pointer transition-colors ${isActive ? activeClass : inactiveClass}`}
          >
            <FaChartBar /> Reports
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
