"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Menu, LogOut, UserRound, Heart, CalendarDays, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
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

  const handleLogout = () => {
    onLogout?.();
    router.push("/signIn");
    toast.success("Logged out successfully");
  };

  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Mobile Menu Button (hidden on desktop) */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 flex items-center justify-center p-2 rounded-lg text-emerald-700 hover:text-emerald-800 transition-colors bg-white shadow-md"
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMobileMenuOpen ? <X size={25} /> : <Menu size={25} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`md:w-24 w-full bg-[#062D25] min-h-screen flex flex-col justify-between z-10 fixed md:static inset-y-0 left-0 transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6 text-white flex flex-col h-full">
          <div className="flex items-center gap-3 mb-8">
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
                <path d="M2 12l10 5" />
              </svg>
            </div>
            <span className="text-xl font-bold">{sidebarTitle}</span>
          </div>

          <nav className="flex flex-col gap-2 flex-1">
            {SidebarLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isMobileMenuOpen
                    ? "text-white hover:bg-emerald-600/20"
                    : "text-[#64748B] hover:text-emerald-600 hover:bg-emerald-50/50"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <link.icon className="w-5 h-5" />
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>

          {/* User profile section */}
          <div className="border-t border-emerald-500/20 pt-4">
            {user ? (
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center shrink-0 overflow-hidden">
                  {user.image ? (
                    <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white font-medium text-sm">{user.name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user.name}</p>
                  <p className="text-xs text-emerald-300 truncate">{user.email}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center text-xs font-medium text-white">
                  U
                </div>
                <span className="text-xs text-emerald-300">User</span>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="w-full rounded-lg px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50/50 transition-all flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Mobile overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-0 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </aside>

      {/* Main Content */}
      <main className="md:ml-24 flex-1 p-6 min-h-screen">
        {/* Desktop sidebar indicator (thin) */}
        <div
          className="md:absolute md:left-24 md:h-screen md:w-px bg-emerald-500/10"
        />

        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};