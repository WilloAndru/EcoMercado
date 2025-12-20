import { Link, Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <main className="loginPage flex1">
      {/* Contenedor principal */}
      <div className="container flex1">
        {/* Seccion izquierda */}
        <div className="leftDiv flex1">
          {/* Marca */}
          <Link className="headerDiv flex1" to="/">
            <img src="icon.png" alt="Icon" />
            <h1>EcoMercado</h1>
          </Link>
          {/* Texto */}
          <div className="textDiv flex1">
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
