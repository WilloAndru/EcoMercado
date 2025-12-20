import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import { getUserData } from "../api/user.api";

function MainLayout() {
  const [user, setUser] = useState(null);

  // Obtenemos los datos de usuario
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getUserData();
        setUser(userData);
        localStorage.setItem("saveEmail", userData.email);
      } catch (error) {
        console.error("Error loading user", error);
      }
    };
    loadUser();
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
