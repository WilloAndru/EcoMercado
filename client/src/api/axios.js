import axios from "axios";

// Crea una instancia de axios con una URL base común para todas las peticiones
export const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
});

// Intercepta TODAS las peticiones antes de enviarlas
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  // Si existe token, se agrega como identificación en la petición
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
