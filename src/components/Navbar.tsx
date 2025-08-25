import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo/logo.svg?react';
import BurgerIcon from '../assets/icons/burger.svg?react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="flex justify-between items-center p-4 md:p-6 bg-white">
        {/* Logo - Left Side */}
        <div className="flex-shrink-0">
          <Link to="/">
            <Logo className="h-8 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation - Centered */}
        <div className="hidden lg:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="text-nav hover:opacity-70 transition-opacity">
            JARVIS
          </Link>
          <Link
            to="/vault"
            className="text-nav hover:opacity-70 transition-opacity"
          >
            VAULT
          </Link>
          <a
            href="https://www.gitbook.com/"
            className="text-nav hover:opacity-70 transition-opacity"
          >
            DOCS
          </a>
        </div>

        {/* Social Links - Right Side */}
        <div className="hidden lg:flex items-center space-x-4">
          <a
            href="https://twitter.com/jarvis"
            target="_blank"
            rel="noopener noreferrer"
            className="text-nav hover:opacity-70 transition-opacity"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
          <a
            href="https://dexscreener.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-nav hover:opacity-70 transition-opacity"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </a>
        </div>

        {/* Burger Menu - Hidden on desktop */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 hover:opacity-70 transition-opacity"
          aria-label="Toggle menu"
        >
          <BurgerIcon className="h-6 w-6" />
        </button>
      </nav>

      {/* Mobile Full-Screen Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 lg:hidden">
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button
              onClick={closeMenu}
              className="p-2 hover:opacity-70 transition-opacity"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Menu Content */}
          <div className="flex flex-col h-full justify-center items-center space-y-8 -mt-16">
            {/* Main Navigation */}
            <div className="flex flex-col items-center space-y-8">
              <Link
                to="/"
                onClick={closeMenu}
                className="text-nav hover:opacity-70 transition-opacity"
              >
                JARVIS
              </Link>
              <Link
                to="/vault"
                onClick={closeMenu}
                className="text-nav hover:opacity-70 transition-opacity"
              >
                VAULT
              </Link>
              <a
                href="https://www.gitbook.com/"
                onClick={closeMenu}
                className="text-nav hover:opacity-70 transition-opacity"
              >
                DOCS
              </a>
            </div>
          </div>

          {/* Bottom Links */}
          <div className="absolute bottom-8 left-0 right-0">
            <div className="flex justify-center space-x-8">
              <a
                href="#"
                onClick={closeMenu}
                className="text-nav hover:opacity-70 transition-opacity"
              >
                TELEGRAM
              </a>
              <a
                href="#"
                onClick={closeMenu}
                className="text-nav hover:opacity-70 transition-opacity"
              >
                DISCORD
              </a>
              <a
                href="#"
                onClick={closeMenu}
                className="text-nav hover:opacity-70 transition-opacity"
              >
                GITHUB
              </a>
            </div>
            
            {/* Social Links in Mobile Menu */}
            <div className="flex justify-center space-x-6 mt-6">
              <a
                href="https://twitter.com/jarvis"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="text-nav hover:opacity-70 transition-opacity"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a
                href="https://dexscreener.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="text-nav hover:opacity-70 transition-opacity"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
