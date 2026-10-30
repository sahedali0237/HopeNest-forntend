"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#052e20] w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 shrink-0">
            <div className="p-1 rounded-md">
              <Image
                src="/logo.png"
                alt="HopeNest Logo"
                width={200}
                height={100}
                className="w-32 h-auto"
                loading="eager"
              />
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-white border-b-2 border-emerald-400 pb-1 text-sm font-medium"
            >
              Home
            </a>
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition pb-1 text-sm font-medium"
            >
              Upcoming Events
            </Link>
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition pb-1 text-sm font-medium"
            >
              About
            </Link>
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition pb-1 text-sm font-medium"
            >
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium transition shadow-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create Event
            </button>

            <div className="w-px h-6 bg-gray-600 mx-2"></div>

            <button className="text-gray-300 hover:text-white transition text-sm font-medium">
              Sign In
            </button>
            <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-md text-sm font-medium transition backdrop-blur-sm">
              Sign Up
            </button>
          </div>

          {/* Mobile menu button (Hidden md and up) */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#042419] border-t border-gray-700 pb-4">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="block px-3 py-2 text-emerald-400 font-medium"
            >
              Home
            </a>
            <a href="#" className="block px-3 py-2 text-gray-300 font-medium">
              Upcoming Events
            </a>
            <a href="#" className="block px-3 py-2 text-gray-300 font-medium">
              About
            </a>
            <a href="#" className="block px-3 py-2 text-gray-300 font-medium">
              Contact
            </a>
          </div>
          <div className="px-4 pt-4 border-t border-gray-700 flex flex-col gap-3">
            <button className="flex justify-center items-center gap-1 bg-emerald-500 text-white px-4 py-2 rounded-md font-medium w-full">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create Event
            </button>
            <button className="text-gray-300 font-medium w-full py-2 text-center">
              Sign In
            </button>
            <button className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-md font-medium w-full">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
