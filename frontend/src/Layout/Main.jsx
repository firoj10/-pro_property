import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Sidebar from '../Components/Sidebar/Sidebar';
import Footer from '../Components/Footer/Footer';


const Main = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Check device width and update mobile state
  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 640) {
        setIsMobile(true);
        setSidebarOpen(false); // Close sidebar on mobile by default
      } else {
        setIsMobile(false);
        setSidebarOpen(true); // Open sidebar on larger devices
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Only toggle sidebar on mobile devices
  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen((prev) => !prev);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <>
      <Navbar
        toggleSidebar={toggleSidebar}
        toggleDropdown={toggleDropdown}
        isDropdownOpen={isDropdownOpen}
      />
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className=" sm:ml-64 mb-24">
        <div className="p-4  rounded-lg  mt-14" style={{ backgroundColor: '#F3F4F6' }}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Main;
