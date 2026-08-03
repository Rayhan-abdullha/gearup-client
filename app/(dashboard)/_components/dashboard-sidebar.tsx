"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  LogOut,
  ChevronDown,
  CreditCard,
  History,
} from "lucide-react";
import type React from "react";
import logout from "@/service/logout";
import { toast } from "sonner";

interface SidebarProps {
  userRole: "PROVIDER" | "ADMIN" | "CUSTOMER";
}

interface MenuItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

export default function DashboardSidebar({ userRole }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const providerMenuItems: MenuItem[] = [
    {
      label: "Overview",
      href: "/provider-dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: "Inventory",
      href: "/provider-dashboard/inventory",
      icon: <Package size={20} />,
    },
    {
      label: "Orders",
      href: "/provider-dashboard/orders",
      icon: <ShoppingCart size={20} />,
      badge: 5,
    },
  ];

  const adminMenuItems: MenuItem[] = [
    {
      label: "Overview",
      href: "/admin-dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: "Users",
      href: "/admin-dashboard/users",
      icon: <Package size={20} />,
    },
    {
      label: "moderation",
      href: "/admin-dashboard/moderation",
      icon: <ShoppingCart size={20} />,
    },
  ];

  const customerMenuItems: MenuItem[] = [
    {
      label: "Overview",
      href: "/customer-dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: "Rental History",
      href: "/customer-dashboard/rentals",
      icon: <History size={20} />,
    },
    {
      label: "Payment History",
      href: "/customer-dashboard/payments",
      icon: <CreditCard size={20} />,
    },
  ];

  const menuItems =
    userRole === "ADMIN"
      ? adminMenuItems
      : userRole === "PROVIDER"
        ? providerMenuItems
        : customerMenuItems;

  const isActive = (href: string) => pathname === href;

  const handleLogout = async () => {
    toast.success("Logged out successfully!");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await logout();
    window.location.href = "/";
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed left-0 top-0 z-40 flex h-16 items-center bg-white px-4 dark:bg-gray-900 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-600 dark:text-gray-400"
          aria-label="Toggle sidebar"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <span className="ml-3 font-bold text-gray-900 dark:text-white">
          {userRole === "PROVIDER"
            ? "Provider"
            : userRole === "ADMIN"
              ? "Admin"
              : "Customer"}{" "}
          Dashboard
        </span>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-full w-64 transform bg-gradient-to-b from-gray-50 to-gray-100 transition-transform duration-300 ease-in-out dark:from-gray-800 dark:to-gray-900 md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo Section */}
        <div className="border-b border-gray-200 bg-white px-6 py-8 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            GearRent
          </h2>
          <p className="mt-1 text-sm capitalize text-gray-600 dark:text-gray-400">
            {userRole} Dashboard
          </p>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1 px-4 py-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between rounded-lg px-4 py-3 transition-colors ${
                isActive(item.href)
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>

        {/* Settings and Logout */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="cursor-pointer mt-2 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile spacer */}
      <div className="h-16 md:hidden" />
    </>
  );
}
