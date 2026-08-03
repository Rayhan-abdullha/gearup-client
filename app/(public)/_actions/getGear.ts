"use server";

interface SearchQuery {
  category?: string[];
  searchTerm?: string;
  brand?: string[];
  minPrice?: number;
  maxPrice?: number;
  isAvailable?: boolean;
}

export const getGears = async (query: SearchQuery) => {
  const params = new URLSearchParams();

  if (query.searchTerm?.trim()) {
    params.set("searchTerm", query.searchTerm.trim());
  }

  if (query.category?.length) {
    query.category.forEach((category) => {
      params.append("category", category);
    });
  }

  if (query.brand?.length) {
    query.brand.forEach((brand) => {
      params.append("brand", brand);
    });
  }

  if (query.minPrice !== undefined) {
    params.set("minPrice", String(query.minPrice));
  }

  if (query.maxPrice !== undefined) {
    params.set("maxPrice", String(query.maxPrice));
  }

  if (query.isAvailable !== undefined) {
    params.set("isAvailable", String(query.isAvailable));
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/gear?${params.toString()}`,
    {
      cache: "no-store",
    },
  );

  const result = await res.json();

  return result;
};
