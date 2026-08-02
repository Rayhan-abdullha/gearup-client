interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
}

export default function StatCard({ icon, label, value, trend }: StatCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
            {trend}
          </p>
        </div>
        <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">{icon}</div>
      </div>
    </div>
  );
}
