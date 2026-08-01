import Navbar from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";
import { getGears } from "./_actions/getGear";
import { getCategory } from "./_actions/getCategory";

export default async function PublicGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const user = await getMe();
  } catch (err) {
    console.log(err);
  }

  return (
    <div>
      <Navbar userRole={"guest"} />
      {children}
    </div>
  );
}
