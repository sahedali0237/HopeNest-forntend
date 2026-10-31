"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const navLinks = [
    { name: "Home", href: "/", active: true },
    { name: "Upcoming Events", href: "/events", active: false },
    { name: "About", href: "/about", active: false },
    { name: "Contact", href: "/contact", active: false },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#052e20] border-b border-emerald-900/60">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="HopeNest Logo"
              width={200}
              height={100}
              className="w-32 h-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-1 text-sm font-medium transition-colors duration-200 ${
                  link.active
                    ? "text-white"
                    : "text-slate-300 hover:text-emerald-400"
                }`}
              >
                {link.name}

                {link.active && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-400 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => router.push("/create-events")}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm shadow-emerald-500/10"
            >
              <Plus size={17} strokeWidth={2.5} />
              Create Event
            </button>

            <div className="w-px h-6 bg-emerald-800 mx-1" />

            {/* Sign In */}
            <button className="text-slate-300 hover:text-white text-sm font-medium transition-colors">
              Sign In
            </button>

            {/* Sign Up */}
            <button className="bg-white/10 hover:bg-white/15 border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200">
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#042419] border-t border-emerald-900/60">
          <div className="max-w-7xl mx-auto px-4 py-4">
            {/* Mobile Navigation Links */}
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    link.active
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-emerald-900/60">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  router.push("/create-events");
                }}
                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors"
              >
                <Plus size={18} />
                Create Event
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center text-slate-300 hover:text-white py-2 text-sm font-medium transition-colors"
              >
                Sign In
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-white/10 hover:bg-white/15 border border-white/20 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
