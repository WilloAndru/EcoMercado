import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import axios from "axios";
import { useState, useEffect } from "react";

const URL = import.meta.env.VITE_REACT_APP_API_URL;

function MainLayout() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(`${URL}/getUserDatas`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
          localStorage.setItem("saveEmail", response.data.email);
          const response2 = await axios.get(`${URL}/productsIdNames`);
          if (response2.status === 200) {
            setProductsIdNames(response.data);
          }
        } catch (error) {
          localStorage.removeItem("token");
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="principal flex">
      <Header user={user} />
      <Outlet />
      {(!user || user.role === "client") && <Footer />}
    </div>
  );
}

export default MainLayout;
