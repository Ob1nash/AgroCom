import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import { useWishlist } from './WishlistContext';

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Get cart and wishlist data from contexts
  const cartContext = useContext(CartContext);
  const { wishlist } = useWishlist();
  
  // Calculate total cart items count
  const cartItemsCount = cartContext?.cartItems.reduce((total, item) => total + item.quantity, 0) || 0;
  
  // Get wishlist items count
  const wishlistItemsCount = wishlist.length;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg py-3' 
        : 'bg-gradient-to-r from-gray-800 to-gray-900 py-4'
    }`}>
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-white font-bold text-xl hover:text-green-400 transition-colors duration-300 flex items-center space-x-2"
        >
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span>AgroCom</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <Link 
            to="/" 
            className="text-white px-4 py-2 rounded-lg hover:bg-gray-700/50 hover:text-green-400 transition-all duration-300 font-medium"
          >
            Home
          </Link>
          <Link 
            to="/cart" 
            className="text-white px-4 py-2 rounded-lg hover:bg-gray-700/50 hover:text-green-400 transition-all duration-300 font-medium relative"
          >
            Cart
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {cartItemsCount > 99 ? '99+' : cartItemsCount}
              </span>
            )}
          </Link>
          <Link 
            to="/Wishlist" 
            className="text-white px-4 py-2 rounded-lg hover:bg-gray-700/50 hover:text-green-400 transition-all duration-300 font-medium relative"
          >
            Wishlist
            {wishlistItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {wishlistItemsCount > 99 ? '99+' : wishlistItemsCount}
              </span>
            )}
          </Link>
          <Link 
            to="/Signup" 
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-all duration-300 font-medium ml-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-300" 
          onClick={toggleDropdown}
        >
          <svg
            className={`h-6 w-6 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isDropdownOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${
        isDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-gray-900/95 backdrop-blur-sm border-t border-gray-700">
          <div className="container mx-auto px-4 py-2 space-y-1">
            <Link 
              to="/" 
              className="block text-white py-3 px-4 rounded-lg hover:bg-gray-700/50 hover:text-green-400 transition-all duration-300 font-medium"
              onClick={() => setIsDropdownOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/cart" 
              className="block text-white py-3 px-4 rounded-lg hover:bg-gray-700/50 hover:text-green-400 transition-all duration-300 font-medium flex items-center justify-between"
              onClick={() => setIsDropdownOpen(false)}
            >
              Cart
              {cartItemsCount > 0 && (
                <span className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartItemsCount > 99 ? '99+' : cartItemsCount}
                </span>
              )}
            </Link>
            <Link 
              to="/Wishlist" 
              className="block text-white py-3 px-4 rounded-lg hover:bg-gray-700/50 hover:text-green-400 transition-all duration-300 font-medium flex items-center justify-between"
              onClick={() => setIsDropdownOpen(false)}
            >
              Wishlist
              {wishlistItemsCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {wishlistItemsCount > 99 ? '99+' : wishlistItemsCount}
                </span>
              )}
            </Link>
            <Link 
              to="/Signup" 
              className="block bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-all duration-300 font-medium text-center mt-2"
              onClick={() => setIsDropdownOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;