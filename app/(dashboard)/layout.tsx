import Navbar from "@/components/shared/navbar";
import DashboardSidebar from "../(dashboard)/_components/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userRole = "provider" as const;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Navbar */}
      <header className="sticky top-0 z-50">
        <Navbar userRole={userRole} />
      </header>

      {/* Dashboard Body */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block lg:w-64 lg:flex-shrink-0">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
            <DashboardSidebar userRole={userRole} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
