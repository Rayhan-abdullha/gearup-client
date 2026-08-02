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

export { getStatusConfig, getPymentSatusConfig };
