import React from 'react';

const Footer = () => {
  return (
    <footer className="p-4 text-white bg-gray-800">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; 2024 Your Company. All rights reserved.</p>
        <div className="flex flex-col justify-center mt-2 md:flex-row">
          <a href="#" className="mx-2 mb-2 md:mb-0 hover:text-gray-400">
            Terms of Service
          </a>
          <span className="mx-2">|</span>
          <a href="#" className="mx-2 mb-2 md:mb-0 hover:text-gray-400">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
