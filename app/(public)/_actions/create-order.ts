"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type GearItem = {
  gearId: string;
  quantity: number;
  startDate: string;
  endDate: string;
};
export const createOrder = async (payload: { items: GearItem[] }) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/rentals`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  return result;
};
