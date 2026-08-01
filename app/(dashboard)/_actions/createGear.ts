"use server";

import { GearItem } from "@/lib/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createGear = async (formData: Partial<GearItem>) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/provider/gear`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  revalidateTag("get-gear", "max");
  const result = await res.json();
  return result;
};
