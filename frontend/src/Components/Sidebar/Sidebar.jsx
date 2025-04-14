import React, { useState } from 'react';
import { FaBuilding, FaUsers, FaLayerGroup, FaChartBar, FaAngleDown, FaAngleRight } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const Sidebar = ({ isSidebarOpen }) => {
  const [isTowerMenuOpen, setIsTowerMenuOpen] = useState(false);
  const [isMemberMenuOpen, setIsMemberMenuOpen] = useState(false);
  const [isCommunityMenuOpen, setIsCommunityMenuOpen] = useState(false);

  return (
    <aside className={`w-68 min-h-screen  fixed transition-all ease-in-out duration-300 ${isSidebarOpen ? "block" : "hidden"} Text`}>
      <ul className="space-y-4 mt-6">
        {/* Dashboard */}
        <li className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-primary text-primary hover:text-white transition-colors">
          <MdDashboard className="w-5 h-5" /> Dashboard
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
            <li className="p-2 rounded cursor-pointer hover:bg-primary text-primary hover:text-white transition-colors">
              Organization Members
            </li>
            <li className="p-2 rounded cursor-pointer hover:bg-primary text-primary hover:text-white transition-colors">
              Role Management
            </li>
            <li className="p-2 rounded cursor-pointer hover:bg-primary text-primary hover:text-white transition-colors">
              Groups Management
            </li>
          </ul>
        )}

        {/* Member Management */}
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
            <li className="p-2 rounded cursor-pointer hover:bg-primary text-primary hover:text-white transition-colors">
              Tower & Unit Management
            </li>
            <li className="p-2 rounded cursor-pointer hover:bg-primary text-primary hover:text-white transition-colors">
              Community  Management
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
            <li className="p-2 rounded cursor-pointer hover:bg-primary text-primary hover:text-white transition-colors">
              Community Sub Menu 1
            </li>
            <li className="p-2 rounded cursor-pointer hover:bg-primary text-primary hover:text-white transition-colors">
              Community Sub Menu 2
            </li>
            <li className="p-2 rounded cursor-pointer hover:bg-primary text-primary hover:text-white transition-colors">
              Community Sub Menu 3
            </li>
          </ul>
        )}

        {/* Reports */}
        <li className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-primary text-primary hover:text-white transition-colors">
          <FaChartBar /> Reports
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
