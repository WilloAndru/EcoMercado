import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { TiShoppingCart } from "react-icons/ti";

function Header({ user }) {
  const shoppingContext = JSON.parse(localStorage.getItem("shoppingContext"));
  const [showOptionsUser, setShowOptionsUser] = useState(false);
  const [input, setInput] = useState("");
  const [showProducts, setShowProducts] = useState(false);
  const [productsIdNames] = useState([]);
  const [productsFilter, setProductsFilter] = useState([]);
  const navigate = useNavigate();
  const blurTimeout = useRef(null);

  const fetchNamesProducts = async (value) => {
    const valueMin = value.toLowerCase();
    const filterProducts = productsIdNames.filter((p) =>
      p.name.toLowerCase().includes(valueMin)
    );
    setProductsFilter(filterProducts);
  };

  const debounceRef = useRef();

  const handleInputChange = (value) => {
    setInput(value);
    setShowProducts(true);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchNamesProducts(value);
    }, 300);
  };

  const handleInputBlur = () => {
    blurTimeout.current = setTimeout(() => {
      setShowProducts(false);
    }, 500);
  };

  const goSearchInterface = async (e) => {
    e.preventDefault();
    input
      ? localStorage.setItem("valueInput", input)
      : localStorage.removeItem("valueInput");
    if (input || localStorage.getItem("valueInput")) {
      setShowProducts(false);
      window.location.href = "/search";
    }
  };

  // Cierra la sesión del usuario
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const canSearch = !user || user.role === "client";

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
        {canSearch && (
          <form
            onSubmit={goSearchInterface}
            className="flex border border-bg rounded-2xl overflow-hidden"
          >
            <input
              type="text"
              value={input}
              placeholder="Search products"
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => setShowProducts(true)}
              onBlur={handleInputBlur}
              className="w-50 md:w-70"
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
        {showProducts && productsFilter.length > 0 && (
          <ul className="absolute z-50 mt-2 bg-white rounded-xl shadow-lg">
            {productsFilter.slice(0, 10).map((product) => (
              <li key={product.id}>
                <Link
                  to={`/product/${product.id}`}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
      {/* Seccion de auth y usuario */}
      <section className="flex gap-4 items-center">
        {user ? (
          // Boton de opciones de usuario
          <button
            className="btn-1 truncate max-w-41"
            onMouseEnter={() => setShowOptionsUser(true)}
            onMouseLeave={() => setShowOptionsUser(false)}
          >
            {user.name}
          </button>
        ) : (
          // Boton de auth
          <Link className="btn-1" to="/login">
            Log in or register
          </Link>
        )}
        {/* Link de carrito de compras */}
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
            className="absolute top-19 flex flex-col bg-bg rounded-2xl shadow-2xl"
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
