import { OrderStatus } from "../_components/_types/provider-types";

const getStatusConfig = (status: string) => {
  const config: Record<
    string,
    { bg: string; text: string; label: string; icon: string }
  > = {
    PLACED: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      label: "Placed",
      icon: "⏳",
    },
    CONFIRMED: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      label: "Confirmed",
      icon: "✓",
    },
    PAID: {
      bg: "bg-purple-100",
      text: "text-purple-800",
      label: "Payment Received",
      icon: "💳",
    },
    PICKED_UP: {
      bg: "bg-green-100",
      text: "text-green-800",
      label: "Picked Up",
      icon: "✓",
    },
    RETURNED: {
      bg: "bg-gray-100",
      text: "text-gray-800",
      label: "Returned",
      icon: "↩",
    },
    CANCELLED: {
      bg: "bg-red-100",
      text: "text-red-800",
      label: "Cancelled",
      icon: "✕",
    },
  };
  return config[status] || config.PLACED;
};

const getPymentSatusConfig = (status: string) => {
  const config: Record<string, { bg: string; text: string; label: string }> = {
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

const getStatusColor = (status: string) => {
  switch (status) {
    case "PLACED":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "CONFIRMED":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "PICKED_UP":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "RETURNED":
      return "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200";
    case "CANCELLED":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
  }
};

const getStatusLabel = (status: string) => {
  return (
    status.replace("_", " ").charAt(0).toUpperCase() +
    status.slice(1).replace("_", " ")
  );
};

const getProviderStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "PLACED":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200";
    case "CONFIRMED":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200";
    case "PAID":
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200";
    case "PICKED_UP":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200";
    case "RETURNED":
      return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200";
    case "CANCELLED":
      return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
  }
};

export {
  getStatusConfig,
  getPymentSatusConfig,
  getStatusColor,
  getStatusLabel,
  getProviderStatusColor,
};
