"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  X,
  Menu,
  LogOut,
  UserRound,
  Heart,
  CalendarDays,
  PlusCircle,
} from "lucide-react";
import { toast } from "react-toastify";

const SidebarLinks = [
  { name: "Create Event", href: "/create-events", icon: PlusCircle },
  { name: "Manage Events", href: "/manage-events", icon: CalendarDays },
  { name: "Joined Events", href: "/joined-events", icon: Heart },
  { name: "Profile", href: "/profile", icon: UserRound },
];

export interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarTitle?: string;
  user?: {
    name: string;
    email: string;
    image?: string;
  };
  onLogout?: () => void;
}

export const DashboardLayout = ({
  children,
  sidebarTitle = "HopeNest",
  user,
  onLogout,
}: DashboardLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    onLogout?.();
    router.push("/signIn");
    toast.success("Logged out successfully");
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col md:flex-row">
      {/* Mobile Menu Button (hidden on desktop) */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 flex items-center justify-center p-2 rounded-lg text-emerald-700 hover:text-emerald-800 transition-colors bg-white shadow-md"
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Backdrop Overlay (Moved outside <aside> for proper stacking) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 bg-[#062D25] text-white min-h-screen flex flex-col justify-between z-40 fixed inset-y-0 left-0 transition-transform duration-300 ease-in-out border-r border-emerald-500/10 ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6 flex flex-col h-full justify-between">
          <div>
            {/* Brand Header */}
            <div className="flex items-center gap-3 mb-8 pl-10 md:pl-0">
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="w-6 h-6 text-white"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight">
                {sidebarTitle}
              </span>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-1.5">
              {SidebarLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "text-emerald-100/70 hover:text-white hover:bg-emerald-800/50"
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="truncate">{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* User Profile & Logout Section */}
          <div className="border-t border-emerald-500/20 pt-4 mt-6">
            {user ? (
              <div className="flex items-center gap-3 mb-4 px-1">
                <div className="relative w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 overflow-hidden">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-white font-semibold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-emerald-300/80 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 mb-4 px-1">
                <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-semibold text-white shrink-0">
                  U
                </div>
                <span className="text-sm text-emerald-200 font-medium">
                  Guest User
                </span>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="w-full rounded-lg px-4 py-2.5 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-6 pt-16 md:pt-6 min-h-screen">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
};