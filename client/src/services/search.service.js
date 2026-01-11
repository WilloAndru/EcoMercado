import { api } from "../api/api";

export const searchProducts = async (query) => {
  if (!query) return [];
  const { data } = await api.get("/productsIdNames", {
    params: { q: query, limit: 5 },
  });
  return data;
};
