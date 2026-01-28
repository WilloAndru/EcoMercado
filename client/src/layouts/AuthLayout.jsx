import { Link, Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <main className="flex items-center justify-center bg-bg h-screen">
      {/* Contenedor principal */}
      <div className="flex items-center h-3/4 w-3/5 min-w-175 rounded-xl bg-white">
        {/* Seccion izquierda */}
        <div className="flex flex-col justify-center min-w-1/2 h-full px-10 gap-8 rounded-xl bg-primary text-white">
          {/* Marca */}
          <Link className="flex items-center gap-4 flex-col" to="/">
            <img className="w-20" src="icon.png" alt="Icon" />
            <h1>EcoMercado</h1>
          </Link>
          {/* Texto */}
          <div className="flex text-center flex-col gap-4">
            <h1>Buy and Sell Extraordinary Items</h1>
            <p>Embrace the New Generation of Sustainable Products</p>
          </div>
        </div>
        {/* Seccion mutable */}
        <Outlet />
      </div>
    </main>
  );
}

export default AuthLayout;
