"use client";

import { useState } from "react";
import { Download, Filter, Search } from "lucide-react";

interface Payment {
  id: string;
  transactionId: string;
  orderId: string;
  gear: string;
  amount: number;
  status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
  paymentMethod: "STRIPE" | "SSL" | "WALLET";
  date: string;
  dueDate: string;
  invoice?: string;
}

const payments: Payment[] = [
  {
    id: "PAY-001",
    transactionId: "txn_1234567890",
    orderId: "ORD-2026-001",
    gear: "Mountain Bike Pro",
    amount: 300,
    status: "COMPLETED",
    paymentMethod: "STRIPE",
    date: "2026-01-15",
    dueDate: "2026-01-15",
    invoice: "INV-2026-001",
  },
  {
    id: "PAY-002",
    transactionId: "txn_0987654321",
    orderId: "ORD-2026-002",
    gear: "Camping Tent 4P",
    amount: 75,
    status: "COMPLETED",
    paymentMethod: "STRIPE",
    date: "2026-01-08",
    dueDate: "2026-01-08",
    invoice: "INV-2026-002",
  },
  {
    id: "PAY-003",
    transactionId: "txn_1111111111",
    orderId: "ORD-2026-003",
    gear: "Fishing Rod Set",
    amount: 100,
    status: "PENDING",
    paymentMethod: "STRIPE",
    date: "2026-01-22",
    dueDate: "2026-01-24",
  },
  {
    id: "PAY-004",
    transactionId: "txn_2222222222",
    orderId: "ORD-2026-004",
    gear: "Kayak Double",
    amount: 600,
    status: "PENDING",
    paymentMethod: "SSL",
    date: "2026-01-28",
    dueDate: "2026-01-31",
  },
  {
    id: "PAY-005",
    transactionId: "txn_3333333333",
    orderId: "ORD-2026-005",
    gear: "Skateboard Pro",
    amount: 60,
    status: "REFUNDED",
    paymentMethod: "STRIPE",
    date: "2026-01-29",
    dueDate: "2026-01-30",
  },
  {
    id: "PAY-006",
    transactionId: "txn_4444444444",
    orderId: "ORD-2026-006",
    gear: "Scuba Diving Set",
    amount: 450,
    status: "FAILED",
    paymentMethod: "STRIPE",
    date: "2026-01-30",
    dueDate: "2026-02-01",
  },
  {
    id: "PAY-007",
    transactionId: "txn_5555555555",
    orderId: "ORD-2025-050",
    gear: "Snowboard Equipment",
    amount: 250,
    status: "COMPLETED",
    paymentMethod: "SSL",
    date: "2025-12-15",
    dueDate: "2025-12-15",
    invoice: "INV-2025-050",
  },
];

export default function PaymentHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<
    "ALL" | "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED"
  >("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getStatusConfig = (status: string) => {
    const config: Record<string, { bg: string; text: string; label: string }> =
      {
        PENDING: {
          bg: "bg-yellow-100",
          text: "text-yellow-800",
          label: "Pending",
        },
        COMPLETED: {
          bg: "bg-green-100",
          text: "text-green-800",
          label: "Completed",
        },
        FAILED: { bg: "bg-red-100", text: "text-red-800", label: "Failed" },
        REFUNDED: {
          bg: "bg-blue-100",
          text: "text-blue-800",
          label: "Refunded",
        },
      };
    return config[status] || config.PENDING;
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.gear.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "ALL" || payment.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedPayments = filteredPayments.slice(
    startIdx,
    startIdx + itemsPerPage,
  );

  // Calculate summary
  const totalSpent = payments
    .filter((p) => p.status === "COMPLETED")
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments
    .filter((p) => p.status === "PENDING")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
        Payment History
      </h1>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          label="Total Paid"
          value={`$${totalSpent}`}
          subtext={`${payments.filter((p) => p.status === "COMPLETED").length} payments`}
          bgColor="bg-green-50 dark:bg-green-900/20"
          textColor="text-green-600 dark:text-green-400"
        />
        <SummaryCard
          label="Pending Payments"
          value={`$${pendingAmount}`}
          subtext={`${payments.filter((p) => p.status === "PENDING").length} payments due`}
          bgColor="bg-yellow-50 dark:bg-yellow-900/20"
          textColor="text-yellow-600 dark:text-yellow-400"
        />
        <SummaryCard
          label="Failed Transactions"
          value={payments.filter((p) => p.status === "FAILED").length}
          subtext="Action required"
          bgColor="bg-red-50 dark:bg-red-900/20"
          textColor="text-red-600 dark:text-red-400"
        />
      </div>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col gap-4 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by Order ID, Gear, or Transaction ID..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-gray-900 placeholder-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value as typeof selectedStatus);
              setCurrentPage(1);
            }}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
            <option value="FAILED">Failed</option>
            <option value="REFUNDED">Refunded</option>
          </select>
        </div>
      </div>

      {/* Payment Table */}
      <div className="rounded-lg bg-white shadow-md dark:bg-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Gear
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Method
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedPayments.length > 0 ? (
                paginatedPayments.map((payment) => {
                  const statusConfig = getStatusConfig(payment.status);

                  return (
                    <tr
                      key={payment.id}
                      className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {payment.date}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {payment.orderId}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {payment.gear}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                        ${payment.amount}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}
                        >
                          {statusConfig.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                          {payment.paymentMethod === "STRIPE"
                            ? "Stripe"
                            : "SSL Commerce"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          {payment.invoice && (
                            <button
                              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                              title="Download Invoice"
                            >
                              <Download size={16} />
                            </button>
                          )}
                          {payment.status === "FAILED" && (
                            <button className="rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-800 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40">
                              Retry
                            </button>
                          )}
                          {payment.status === "PENDING" && (
                            <button className="rounded bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:hover:bg-yellow-900/40">
                              Pay Now
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-gray-600 dark:text-gray-400"
                  >
                    No payments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing {startIdx + 1} to{" "}
              {Math.min(startIdx + itemsPerPage, filteredPayments.length)} of{" "}
              {filteredPayments.length} payments
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Download All Button */}
      <div className="mt-6 flex justify-end">
        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700">
          <Download size={18} />
          Download All Invoices
        </button>
      </div>
    </div>
  );
}

interface SummaryCardProps {
  label: string;
  value: string | number;
  subtext: string;
  bgColor: string;
  textColor: string;
}

function SummaryCard({
  label,
  value,
  subtext,
  bgColor,
  textColor,
}: SummaryCardProps) {
  return (
    <div className={`rounded-lg ${bgColor} p-6`}>
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {label}
      </p>
      <p className={`mt-2 text-3xl font-bold ${textColor}`}>{value}</p>
      <p className="mt-1 text-xs text-gray-600 dark:text-gray-500">{subtext}</p>
    </div>
  );
}
