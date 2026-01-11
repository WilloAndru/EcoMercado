import { api } from "../api/api";

export const getHomeData = async () => {
  const day = new Date().getDay();

  // Peticiones en paralelo para optimizar rendimiento
  const [categories, bestSellers, latest, forDay] = await Promise.all([
    api.get("/categories"),
    api.get("/bestSellers"),
    api.get("/latest"),
    api.post("/forDay", { category_id: day }),
  ]);

  return {
    categories: categories.data,
    bestSellers: bestSellers.data,
    latest: latest.data,
    forDay: forDay.data,
  };
};
