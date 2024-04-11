import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-gray-800 py-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-semibold text-lg px-4">AgroCom</Link>

      

        <button className="md:hidden text-white px-4" onClick={toggleDropdown}>
          <svg
            className="h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d={isDropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
            />
          </svg>
        </button>
        <div className="md:flex hidden">
          <Link to="/" className="text-white mx-4  hover:text-gray-300 transition-colors duration-300">Home</Link>
          {/* <Link to="/product" className="text-white mx-4 hover:text-gray-300 transition-colors duration-300">Products</Link> */}
          <Link to="/cart" className="text-white  mr-4">Cart</Link>
          <Link to="/Wishlist" className="text-white mr-4">Wishlist</Link>
          <Link to="/Signup" className="text-white mr-4">Sign Up</Link>
          
        </div>
      </div>
      {isDropdownOpen && (
        <div className="absolute top-full left-0 right-0 bg-gray-800 md:hidden">
          <Link to="/" className="block text-white py-2 px-4">Home</Link>
          {/* <Link to="/product" className="block text-white py-2 px-4">Products</Link> */}
          <Link to="/cart" className="block text-white py-2 px-4">Cart</Link>
          <Link to="/Wishlist" className="block text-white py-2 px-4">Wishlist</Link>
          <Link to="/Signup" className="block text-white py-2 px-4">Sign Up</Link>
          
         
        </div>
      )}
    </nav>
  );
}

export default Navbar;
