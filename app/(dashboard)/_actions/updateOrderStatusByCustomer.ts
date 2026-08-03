"use server";
import { cookies } from "next/headers";

export const updateOrderStatusByCustomer = async (
  orderId: string,
  status: "CANCELLED" | "RETURNED",
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
    `${process.env.BACKEND_API_URL}/rentals/orders/${orderId}`,
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
