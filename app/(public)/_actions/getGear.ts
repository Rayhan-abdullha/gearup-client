"use server";

import { cookies } from "next/headers";

export const getGears = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
}) => {
  const params = new URLSearchParams();

  if (query && query.searchTerm) {
    params.set("searchTerm", query.searchTerm as string);
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/gear?${params.toString()}`,
    {
      next: {
        revalidate: 60 * 60 * 6,
        tags: ["get-gear"],
      },
    },
  );

  const result = await res.json();
  return result;
};
