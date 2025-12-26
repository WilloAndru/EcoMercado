import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

export const searchProducts = async (query) => {
  if (!query) return [];
  const { data } = await api.get("/productsIdNames", {
    params: { q: query, limit: 5 },
  });
  return data;
};
