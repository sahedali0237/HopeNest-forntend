"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Plus,
  Menu,
  X,
  LogOut,
  UserRound,
  Heart,
  CalendarDays,
  PlusCircle,
  ChevronDown,
} from "lucide-react";
import { useSession } from "@/hooks/use-session";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Upcoming Events", href: "/events" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useSession();

  // Home matches only "/", other links also match their sub-routes
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

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
                  isActive(link.href)
                    ? "text-white"
                    : "text-slate-300 hover:text-emerald-400"
                }`}
              >
                {link.name}

                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-400 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isLoading ? (
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 animate-pulse" />
                <div className="w-20 h-6 rounded bg-emerald-500/20 animate-pulse" />
              </div>
            ) : user ? (
              <>
                <button
                  onClick={() => router.push("/create-events")}
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm shadow-emerald-500/10"
                >
                  <Plus size={17} strokeWidth={2.5} />
                  Create Event
                </button>

                <div className="w-px h-6 bg-emerald-800 mx-1" />

                {/* User Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                    aria-expanded={isProfileMenuOpen}
                    aria-haspopup="true"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center overflow-hidden ring-2 ring-emerald-500">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name}
                          className="w-full h-full object-cover"
                          width={32}
                          height={32}
                        />
                      ) : (
                        <UserRound className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <span className="hidden sm:inline-block">{user.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {isProfileMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsProfileMenuOpen(false)}
                        aria-hidden="true"
                      />
                      <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow-lg border border-emerald-200 py-2 z-20">
                        <div className="px-4 py-3 border-b border-emerald-100">
                          <p className="font-semibold text-[#062D25]">
                            {user.name}
                          </p>
                          <p className="text-sm text-emerald-600">
                            {user.email}
                          </p>
                        </div>
                        <Link
                          href="/create-events"
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#64748B] hover:text-emerald-600 hover:bg-emerald-50/50 transition-colors"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <PlusCircle className="w-4 h-4" />
                          Create Event
                        </Link>
                        <Link
                          href="/manage-events"
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#64748B] hover:text-emerald-600 hover:bg-emerald-50/50 transition-colors"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <CalendarDays className="w-4 h-4" />
                          Manage Events
                        </Link>
                        <Link
                          href="/joined-events"
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#64748B] hover:text-emerald-600 hover:bg-emerald-50/50 transition-colors"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <Heart className="w-4 h-4" />
                          Joined Events
                        </Link>
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#64748B] hover:text-emerald-600 hover:bg-emerald-50/50 transition-colors"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <UserRound className="w-4 h-4" />
                          Profile
                        </Link>
                        <hr className="my-2 border-emerald-100" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50/50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => router.push("/create-events")}
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm shadow-emerald-500/10"
                >
                  <Plus size={17} strokeWidth={2.5} />
                  Create Event
                </button>

                <div className="w-px h-6 bg-emerald-800 mx-1" />

                {/* Sign In */}
                <button
                  onClick={() => router.push("/signIn")}
                  className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
                >
                  Sign In
                </button>

                {/* Sign Up */}
                <button
                  onClick={() => router.push("/signUp")}
                  className="bg-white/10 hover:bg-white/15 border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                >
                  Sign Up
                </button>
              </>
            )}
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
                    isActive(link.href)
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

              {isLoading ? (
                <div className="h-12 bg-emerald-500/20 animate-pulse rounded-lg" />
              ) : user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-emerald-500/10">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center overflow-hidden ring-2 ring-emerald-500">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name}
                          className="w-full h-full object-cover"
                          width={40}
                          height={40}
                        />
                      ) : (
                        <UserRound className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{user.name}</p>
                      <p className="text-sm text-emerald-300">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    href="/create-events"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <PlusCircle className="w-5 h-5" />
                    Create Event
                  </Link>
                  <Link
                    href="/manage-events"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <CalendarDays className="w-5 h-5" />
                    Manage Events
                  </Link>
                  <Link
                    href="/joined-events"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Heart className="w-5 h-5" />
                    Joined Events
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <UserRound className="w-5 h-5" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      router.push("/signIn");
                    }}
                    className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      router.push("/signUp");
                    }}
                    className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
