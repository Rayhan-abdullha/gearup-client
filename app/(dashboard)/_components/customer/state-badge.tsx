type StatusBadgeProps = {
  status: string;
};
export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig: Record<
    string,
    { bg: string; text: string; label: string }
  > = {
    PLACED: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      label: "Awaiting Confirmation",
    },
    CONFIRMED: { bg: "bg-blue-100", text: "text-blue-800", label: "Confirmed" },
    PAID: {
      bg: "bg-purple-100",
      text: "text-purple-800",
      label: "Payment Received",
    },
    PICKED_UP: {
      bg: "bg-green-100",
      text: "text-green-800",
      label: "Picked Up",
    },
    RETURNED: { bg: "bg-gray-100", text: "text-gray-800", label: "Returned" },
    CANCELLED: { bg: "bg-red-100", text: "text-red-800", label: "Cancelled" },
  };

  const config = statusConfig[status] || statusConfig.PLACED;

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}
