"use client";

interface OrderTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  formatStatusLabel: (status: string) => string;
}

const TABS = [
  "ALL",
  "PLACED",
  "CONFIRMED",
  "PAID",
  "PICKED_UP",
  "RETURNED",
  "CANCELLED",
];

export function OrderTabs({
  activeTab,
  setActiveTab,
  formatStatusLabel,
}: OrderTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`border-b-2 px-4 py-2 font-medium transition-colors ${
            activeTab === tab
              ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
              : "border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          {tab === "ALL" ? "All Orders" : formatStatusLabel(tab)}
        </button>
      ))}
    </div>
  );
}
