import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { TiShoppingCart } from "react-icons/ti";
import { useSearchBar } from "../../hooks/useSearchBar";

function Header({ user }) {
  const { query, results, setResults, onChange } = useSearchBar();

  const shoppingContext = JSON.parse(localStorage.getItem("shoppingContext"));
  const [showOptionsUser, setShowOptionsUser] = useState(false);

  const isClient = !user || user.role === "client";
  const navigate = useNavigate();

  // Cuando se le da click a buscar
  const goSearchInterface = async () => {
    query
      ? localStorage.setItem("valueInput", query)
      : localStorage.removeItem("valueInput");
    if (query || localStorage.getItem("valueInput")) {
      localStorage.removeItem("idCategory");
      setResults([]);
      navigate("/search");
    }
  };

  // Cierra la sesión del usuario
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="flex w-full justify-around items-center fixed bg-primary z-10 h-25 px-5">
      {/* Marca */}
      <Link
        to={user && user.role === "admin" ? "/admin" : "/"}
        className="flex gap-2 items-center text-white"
      >
        <img className="w-14" src="/icon.png" alt="Icon" />
        <span className="font-bold text-3xl hidden md:flex">EcoMercado</span>
      </Link>
      {/* Barra de busqueda */}
      <section className="relative">
        {isClient && (
          <form
            onSubmit={goSearchInterface}
            className="flex border border-bg rounded-xl overflow-hidden"
          >
            <input
              type="text"
              value={query}
              placeholder="Search products"
              onChange={(e) => onChange(e.target.value)}
              className="w-50 md:w-70 bg-bg"
            />
            <button
              type="submit"
              className="px-5 py-3 text-white hover:bg-hover"
            >
              <IoIosSearch className="text-2xl" />
            </button>
          </form>
        )}
        {/* Sugerencias de busqueda */}
        {results.length > 0 && (
          <ul className="absolute z-10 bg-bg rounded-xl shadow-2xl w-50 md:w-70">
            {results.map((item, i) => (
              <li key={i}>
                <Link
                  to={`/product/${item.id}`}
                  onClick={() => setResults([])}
                  className="flex px-6 py-4 rounded-xl hover:bg-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
      {/* Seccion derecha */}
      <section className="flex gap-4 items-center">
        {/* Boton de auth y opciones de usuario */}
        {user ? (
          <button
            className="btn-1 truncate max-w-41"
            onMouseEnter={() => setShowOptionsUser(true)}
            onMouseLeave={() => setShowOptionsUser(false)}
          >
            {user.name}
          </button>
        ) : (
          <Link className="btn-1" to="/login">
            Log in or register
          </Link>
        )}
        {/* Carrito de compras */}
        {shoppingContext && (
          <Link className="btn-1 flex relative" to={"/shoppingCart"}>
            <TiShoppingCart className="text-3xl" />
            <span className="absolute -bottom-3 left-3 w-6 h-6 rounded-full flex items-center justify-center bg-white text-fg">
              {shoppingContext.length}
            </span>
          </Link>
        )}
        {/* Opciones de usuario */}
        {showOptionsUser && (
          <section
            className="absolute top-18 flex flex-col bg-bg rounded-2xl shadow-2xl"
            onMouseEnter={() => setShowOptionsUser(true)}
            onMouseLeave={() => setShowOptionsUser(false)}
          >
            {/* Opciones disponibles para usuarios con rol cliente */}
            {user.role === "client" &&
              [
                { to: "/profile", label: "My Profile" },
                { to: "/publishProduct/0", label: "Publish" },
                { to: "/editSales", label: "Edit Listings" },
                { to: "/profileSales", label: "Sold Items" },
                { to: "/profilePurchases", label: "My Purchases" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="w-full px-6 py-5 font-bold rounded-2xl hover:bg-white"
                >
                  {label}
                </Link>
              ))}
            {/* Boton de cerrar sesion */}
            <button
              onClick={handleLogout}
              className="w-full px-6 py-5 font-bold text-left rounded-2xl hover:bg-white"
            >
              Log Out
            </button>
          </section>
        )}
      </section>
    </header>
  );
}

export default Header;
