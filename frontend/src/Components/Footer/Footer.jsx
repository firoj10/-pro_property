import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow-sm md:flex md:items-center md:justify-between md:p-6 ">
      <span className="text-sm text-gray-500 sm:text-center  text-primary    ">
        © 2025{' '}
        <a href="https://flowbite.com/" className="hover:underline">
          Dragon™
        </a>
        . All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500  sm:mt-0">
        <li>
          <a href="#" className="hover:underline me-4 md:me-6 text-primary    ">
            About
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline me-4 md:me-6 text-primary    ">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline me-4 md:me-6 text-primary    ">
            Licensing
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline text-primary    ">
            Contact
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
