"use client";

import { useState } from "react";
import Link from "next/link";
import { Compass, LogOut, Menu, X } from "lucide-react";
import { Button } from "@base-ui/react";
import { toast } from "sonner";
import logout from "@/service/logout";

export type UserRole = "guest" | "customer" | "provider" | "admin";

interface NavbarProps {
  userRole?: UserRole;
}

const navigationByRole: Record<UserRole, { label: string; href: string }[]> = {
  guest: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Login", href: "/login" },
  ],
  customer: [
    { label: "Home", href: "/" },
    { label: "My Orders", href: "/customer-dashboard/orders" },
    { label: "Dashboard", href: "/customer-dashboard" },
  ],
  provider: [
    { label: "Home", href: "/" },
    { label: "Add Gear", href: "/provider-dashboard/inventory?action=add" },
    { label: "Orders", href: "/provider-dashboard/orders" },
    { label: "Dashboard", href: "/provider-dashboard" },
  ],
  admin: [
    { label: "Dashboard", href: "/admin-dashboard" },
    { label: "Users", href: "/admin-dashboard/users" },
    { label: "Gear", href: "/admin-dashboard/gear" },
    { label: "Rentals", href: "/admin-dashboard/rentals" },
  ],
};

export default function Navbar({ userRole = "guest" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navItems = navigationByRole[userRole.toLocaleLowerCase() as UserRole];

  const handleLogout = async () => {
    toast.success("Logged out successfully!");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await logout();
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="text-center space-y-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-2xl font-black text-gray-900 dark:text-white tracking-tight hover:opacity-90 transition-opacity"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/30">
                <Compass className="w-6 h-6" />
              </div>
              <span>
                Gear
                <span className="text-blue-600 dark:text-blue-500">Rental</span>
              </span>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            {userRole !== "guest" && (
              <Button
                onClick={handleLogout}
                className="ml-4 inline-flex items-center gap-2 rounded-xl border border-red-200/80 bg-red-50/50 px-3.5 py-2 text-xs font-semibold text-red-600 backdrop-blur-sm transition-all duration-200 hover:border-red-300 hover:bg-red-100/70 hover:shadow-sm dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-400 dark:hover:border-red-800/60 dark:hover:bg-red-950/50 cursor-pointer"
              >
                <LogOut className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                <span>Logout</span>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              aria-expanded="false"
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-gray-200 dark:border-gray-800 md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
