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
    <header className="flex1">
      <Link
        to={user && user.role === "admin" ? "/admin" : "/"}
        className="flex1 principalBtn"
      >
        <img className="logo" src="/icon.png" alt="Icon" />
        <h1>EcoMercado</h1>
      </Link>

      <div className="flex1 searchBar">
        {(!user || user.role === "client") && (
          <form className="flex1" onSubmit={goSearchInterface}>
            <input
              className="input"
              type="text"
              placeholder="Search for what you want"
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => setShowProducts(true)}
              onBlur={handleInputBlur}
            />
            <button type="submit" className="flex1">
              <IoIosSearch className="icon" />
            </button>
          </form>
        )}
        {showProducts && (
          <div className="suggestContainer flex1">
            {productsFilter.slice(0, 10).map((product, id) => (
              <Link key={id} to={`/product/${product.id}`}>
                {product.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="flex1">
        {user ? (
          <button
            className="btn btnLogin"
            onMouseEnter={() => setShowOptionsUser(true)}
            onMouseLeave={() => setShowOptionsUser(false)}
          >
            {user.name}
          </button>
        ) : (
          <Link className="btn btnLogin" to="/login">
            Log in or register
          </Link>
        )}
        {shoppingContext && (
          <button
            className="btn btnCart flex1"
            onClick={() => navigate("/shoppingCart")}
          >
            <TiShoppingCart />
            <span className="flex1">{shoppingContext.length}</span>
          </button>
        )}
        {showOptionsUser && (
          <div
            className="optionsUser flex1"
            onMouseEnter={() => setShowOptionsUser(true)}
            onMouseLeave={() => setShowOptionsUser(false)}
          >
            {user.role === "client" && <Link to="/profile">My Profile</Link>}
            {user.role === "client" && (
              <Link to="/publishProduct/0">Publish</Link>
            )}
            {user.role === "client" && (
              <Link to="/editSales">Edit Listings</Link>
            )}
            {user.role === "client" && (
              <Link to="/profileSales">Sold Items</Link>
            )}
            {user.role === "client" && (
              <Link to="/profilePurchases">My Purchases</Link>
            )}
            <Link onClick={handleLogout}>Log Out</Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
