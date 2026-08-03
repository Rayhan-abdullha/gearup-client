"use server";
import { cookies } from "next/headers";

export const updaeOrderByProvider = async (
  orderId: string,
  status: "CONFIRMED" | "CANCELLED" | "PICKED_UP",
) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/provider/orders/${orderId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    },
  );

  const result = await res.json();
  return result;
};
