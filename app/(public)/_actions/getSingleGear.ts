"use server";
export const getSingleGear = async (id: string) => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/gear/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch gear data");
  }
  const result = await res.json();
  return result;
};
