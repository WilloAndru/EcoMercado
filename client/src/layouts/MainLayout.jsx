import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useUser } from "../hooks/useUser";

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
    <div className="flex flex-col items-center bg-bg">
      <Header user={user} />
      <main
        className={`pt-45 pb-20 w-full flex justify-center px-[2vw] ${
          !isClient ? "min-h-screen" : "min-h-[88vh]"
        }`}
      >
        <Outlet />
      </main>

      {isClient && <Footer />}
    </div>
  );
}

export default MainLayout;
