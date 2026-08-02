import UserManagementPage from "../../_components/admin/user-management";
import { getAllUsers } from "../../_actions/getAllusers";
import { Suspense } from "react";
import UserManagementSkeleton from "../../_components/admin/user-management-skeleton";
export default async function Page() {
  const usersRes = await getAllUsers();

  return (
    <Suspense fallback={<UserManagementSkeleton />}>
      <UserManagementPage initialUsers={usersRes.data || []} />;
    </Suspense>
  );
}
