"use client";

import { useState } from "react";
import {
  Search,
  MoreVertical,
  CheckCircle,
  XCircle,
  Mail,
  MapPin,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "provider" | "admin";
  status: "active" | "suspended";
  joinDate: string;
  listings?: number;
  rentals?: number;
  location: string;
}

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRole, setSelectedRole] = useState<
    "all" | "customer" | "provider" | "admin"
  >("all");
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "active" | "suspended"
  >("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allUsers: User[] = [
    {
      id: "USR-001",
      name: "John Smith",
      email: "john.smith@example.com",
      role: "customer",
      status: "active",
      joinDate: "Jan 15, 2024",
      rentals: 8,
      location: "New York, NY",
    },
    {
      id: "USR-002",
      name: "Alpine Sports Hub",
      email: "contact@alpinesports.com",
      role: "provider",
      status: "active",
      joinDate: "Dec 10, 2023",
      listings: 287,
      location: "Denver, CO",
    },
    {
      id: "USR-003",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      role: "customer",
      status: "active",
      joinDate: "Feb 3, 2024",
      rentals: 12,
      location: "Los Angeles, CA",
    },
    {
      id: "USR-004",
      name: "Urban Adventure",
      email: "info@urbanadventure.com",
      role: "provider",
      status: "active",
      joinDate: "Nov 20, 2023",
      listings: 156,
      location: "Chicago, IL",
    },
    {
      id: "USR-005",
      name: "Mike Davis",
      email: "mike.davis@example.com",
      role: "customer",
      status: "suspended",
      joinDate: "Jan 8, 2024",
      rentals: 3,
      location: "Houston, TX",
    },
    {
      id: "USR-006",
      name: "Coastal Gear Rentals",
      email: "support@coastalgear.com",
      role: "provider",
      status: "active",
      joinDate: "Oct 5, 2023",
      listings: 142,
      location: "San Francisco, CA",
    },
    {
      id: "USR-007",
      name: "Emily Rodriguez",
      email: "emily.r@example.com",
      role: "customer",
      status: "active",
      joinDate: "Feb 18, 2024",
      rentals: 5,
      location: "Phoenix, AZ",
    },
    {
      id: "USR-008",
      name: "Peak Performance",
      email: "team@peakperformance.com",
      role: "provider",
      status: "suspended",
      joinDate: "Sep 12, 2023",
      listings: 89,
      location: "Boulder, CO",
    },
  ];

  // Filter users
  let filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesStatus =
      selectedStatus === "all" || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleToggleStatus = (user: User) => {
    console.log(`Toggle status for user: ${user.id}`);
    // In a real app, this would make an API call
  };

  const openUserDetails = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "provider":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "customer":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          User Management
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          View and manage all platform users
        </p>
      </div>

      {/* Search and Filters */}
      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full border border-gray-300 bg-white py-2 pl-10 pr-4 rounded-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Role Filter */}
          <select
            value={selectedRole}
            onChange={(e) => {
              setSelectedRole(e.target.value as any);
              setCurrentPage(1);
            }}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            <option value="all">All Roles</option>
            <option value="customer">Customers</option>
            <option value="provider">Providers</option>
            <option value="admin">Admins</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value as any);
              setCurrentPage(1);
            }}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Showing{" "}
          {paginatedUsers.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}{" "}
          to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{" "}
          {filteredUsers.length} users
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto rounded-lg bg-white shadow-md dark:bg-gray-800">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-700 dark:text-gray-300">
                User
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-700 dark:text-gray-300">
                Role
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-700 dark:text-gray-300">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-700 dark:text-gray-300">
                Activity
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-700 dark:text-gray-300">
                Joined
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-700 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Mail size={14} />
                      {user.email}
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <MapPin size={14} />
                      {user.location}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${getRoleColor(user.role)}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {user.status === "active" ? (
                      <>
                        <CheckCircle
                          size={18}
                          className="text-green-600 dark:text-green-400"
                        />
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          Active
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle
                          size={18}
                          className="text-red-600 dark:text-red-400"
                        />
                        <span className="text-sm font-medium text-red-600 dark:text-red-400">
                          Suspended
                        </span>
                      </>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {user.role === "provider"
                    ? `${user.listings} listings`
                    : `${user.rentals} rentals`}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {user.joinDate}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openUserDetails(user)}
                      className="rounded px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-gray-700"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleToggleStatus(user)}
                      className={`rounded px-3 py-1 text-sm font-medium ${
                        user.status === "active"
                          ? "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-700"
                          : "text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-gray-700"
                      }`}
                    >
                      {user.status === "active" ? "Suspend" : "Activate"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          Previous
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          Next
        </button>
      </div>

      {/* User Details Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                User Details
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                  Name
                </label>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {selectedUser.name}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                  Email
                </label>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {selectedUser.email}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                  Location
                </label>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {selectedUser.location}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                    Role
                  </label>
                  <span
                    className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${getRoleColor(selectedUser.role)}`}
                  >
                    {selectedUser.role}
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                    Status
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    {selectedUser.status === "active" ? (
                      <>
                        <CheckCircle
                          size={18}
                          className="text-green-600 dark:text-green-400"
                        />
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          Active
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle
                          size={18}
                          className="text-red-600 dark:text-red-400"
                        />
                        <span className="text-sm font-medium text-red-600 dark:text-red-400">
                          Suspended
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                  Joined
                </label>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {selectedUser.joinDate}
                </p>
              </div>

              <div className="flex gap-3 pt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleToggleStatus(selectedUser);
                    setIsModalOpen(false);
                  }}
                  className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium text-white ${
                    selectedUser.status === "active"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {selectedUser.status === "active"
                    ? "Suspend User"
                    : "Activate User"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
