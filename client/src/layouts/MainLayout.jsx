import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useUser } from "../hooks/useUser";

const URL = import.meta.env.VITE_API_URL;

function MainLayout() {
  const { user, loading } = useUser();
  const isClient = !user || user.role === "client";

  // UI de carga
  if (loading) {
    return (
      <h1 className="w-screen h-screen flex items-center justify-center">
        Loading...
      </h1>
    );
  }

  return (
    <div className="flex flex-col">
      <Header user={user} />
      <Outlet />
      {isClient && <Footer />}
    </div>
  );
}

export default MainLayout;
