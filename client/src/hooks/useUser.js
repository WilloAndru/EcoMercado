import { useState, useEffect } from "react";
import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${URL}/getUserDatas`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        localStorage.setItem("saveEmail", response.data.email);
      } catch (error) {
        console.error("Error fetching user:", error);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
};
