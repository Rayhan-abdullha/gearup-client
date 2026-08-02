"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Payment {
  orderId: string;
}
export const createPayment = async (payload: Payment) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/payments/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    redirect(result.data.checkoutUrl);
  }
  return result;
};
