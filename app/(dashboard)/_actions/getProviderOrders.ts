"use server";

import { cookies } from "next/headers";

export const getProviderOrders = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/provider/orders`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result = await res.json();
  return result;
};
