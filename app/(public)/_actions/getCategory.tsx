"use server";
export const getCategory = async () => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/gear/categories`, {
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24 * 7,
      tags: ["categories"],
    },
  });

  const result = await res.json();
  return result;
};
