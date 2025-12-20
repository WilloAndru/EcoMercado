import { api } from "./axios";

// Obtenemos los datos de usuario
export const getUserData = async () => {
  const response = await api.get("/getUserDatas");
  return response.data;
};
