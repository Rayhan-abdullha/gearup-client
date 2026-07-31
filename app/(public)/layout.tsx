import Navbar from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";

export default async function PublicGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();
  return (
    <div>
      <Navbar userRole={user?.data.role || "guest"} />
      {children}
    </div>
  );
}
