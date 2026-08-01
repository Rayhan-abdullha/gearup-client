import Navbar from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";
import { getGears } from "./_actions/getGear";
import { getCategory } from "./_actions/getCategory";

export default async function PublicGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();
  const gear = await getGears({});
  const category = await getCategory();
  console.log(category);
  return (
    <div>
      <Navbar userRole={user?.data.role || "guest"} />
      {children}
    </div>
  );
}
