"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const logout = async () => {
  // remove the accessToken cookie from locally
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  // redirect the user to the home page after logout
  revalidateTag("my-profile", "max");
};

export default logout;
