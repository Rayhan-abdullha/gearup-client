import Navbar from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";
import { UserRole } from "@/components/shared/navbar";

export default async function PublicGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();
  const userRole: UserRole = user.success
    ? (user.data.role as UserRole)
    : "guest";
  return (
    <div>
      <Navbar userRole={userRole} />
      {children}
    </div>
  );
}
