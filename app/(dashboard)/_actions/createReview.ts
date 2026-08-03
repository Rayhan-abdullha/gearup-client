"use server";

import { cookies } from "next/headers";

interface ReviewState {
  success: boolean;
  error: string | null;
}

export const submitReviewActions = async (
  _: ReviewState,
  formData: FormData,
  gearId: string,
  orderId: string,
) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  const rating = Number(formData.get("rating"));
  const comment = String(formData.get("comment") ?? "");

  const review = {
    gearId,
    rating,
    comment,
  };

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/reviews/orders/${orderId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(review),
    },
  );

  console.log(res);

  const result = await res.json();
  return result;
};
