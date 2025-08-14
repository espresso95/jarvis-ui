import React, { useState } from 'react';
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
      <nav className="flex justify-between items-center p-4 md:p-6  bg-white">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <Logo className="h-8 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden lg:flex space-x-8">
          <Link to="/" className="text-nav hover:opacity-70 transition-opacity">
            JARVIS
          </Link>
          <Link
            to="/agents"
            className="text-nav hover:opacity-70 transition-opacity"
          >
            AGENTS
          </Link>
          <Link
            to="/account"
            className="text-nav hover:opacity-70 transition-opacity"
          >
            ACCOUNT
          </Link>
          <a
            href="https://www.gitbook.com/"
            className="text-nav hover:opacity-70 transition-opacity"
          >
            DOCS
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

        {/* Spacer for desktop to keep logo left-aligned */}
        <div className="hidden lg:block flex-shrink-0 w-6"></div>
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
                to="/account"
                onClick={closeMenu}
                className="text-nav hover:opacity-70 transition-opacity"
              >
                ACCOUNT
              </Link>
              <a
                href="https://www.gitbook.com/"
                onClick={closeMenu}
                className="text-nav hover:opacity-70 transition-opacity"
              >
                DOCS
              </a>
              <Link
                to="/agents"
                onClick={closeMenu}
                className="text-nav hover:opacity-70 transition-opacity"
              >
                AGENTS
              </Link>
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
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
