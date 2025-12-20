import { useRef, useState } from "react";
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
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchNamesProducts(value);
    }, 300);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
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

  return (
    <header className="flex w-full justify-around items-center fixed bg-primary z-10 h-25 px-5">
      {/* Marca */}
      <Link
        to={user && user.role === "admin" ? "/admin" : "/"}
        className="flex gap-2 items-center text-white"
      >
        <img className="w-15" src="/icon.png" alt="Icon" />
        <h1 className="hidden md:flex">EcoMercado</h1>
      </Link>
      {/* Barra de busqueda */}
      <section className="flex">
        {/* Form de busqueda */}
        {(!user || user.role === "client") && (
          <form
            className="flex border border-bg rounded-2xl overflow-hidden"
            onSubmit={goSearchInterface}
          >
            {/* Input */}
            <input
              type="text"
              className="w-50 md:w-70"
              placeholder="Search for what you want"
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => setShowProducts(true)}
              onBlur={handleInputBlur}
            />
            {/* Boton de buscar */}
            <button
              type="submit"
              className="text-white px-5 py-3 hover:bg-hover"
            >
              <IoIosSearch className="text-2xl" />
            </button>
          </form>
        )}
        {/* Recomendaciones de busqueda */}
        {showProducts && (
          <div className="flex flex-col">
            {productsFilter.slice(0, 10).map((product, id) => (
              <Link key={id} to={`/product/${product.id}`}>
                {product.name}
              </Link>
            ))}
          </div>
        )}
      </section>
      {/* Seccion de auth y usuario */}
      <section className="flex gap-4">
        {user ? (
          // Boton de opciones de usuario
          <button
            className="btn-1"
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
          <div
            className="shadow-2xl absolute top-19 flex flex-col items-start bg-bg rounded-2xl"
            onMouseEnter={() => setShowOptionsUser(true)}
            onMouseLeave={() => setShowOptionsUser(false)}
          >
            {user.role === "client" && (
              <Link
                className="py-5 px-6 font-bold hover:bg-white rounded-2xl w-full"
                to="/profile"
              >
                My Profile
              </Link>
            )}
            {user.role === "client" && (
              <Link
                className="py-5 px-6 font-bold hover:bg-white rounded-2xl w-full"
                to="/publishProduct/0"
              >
                Publish
              </Link>
            )}
            {user.role === "client" && (
              <Link
                className="py-5 px-6 font-bold hover:bg-white rounded-2xl w-full"
                to="/editSales"
              >
                Edit Listings
              </Link>
            )}
            {user.role === "client" && (
              <Link
                className="py-5 px-6 font-bold hover:bg-white rounded-2xl w-full"
                to="/profileSales"
              >
                Sold Items
              </Link>
            )}
            {user.role === "client" && (
              <Link
                className="py-5 px-6 font-bold hover:bg-white rounded-2xl w-full"
                to="/profilePurchases"
              >
                My Purchases
              </Link>
            )}
            <Link
              className="py-5 px-6 font-bold hover:bg-white rounded-2xl w-full"
              onClick={handleLogout}
            >
              Log Out
            </Link>
          </div>
        )}
      </section>
    </header>
  );
}

export default Header;
