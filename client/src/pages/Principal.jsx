import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { TiShoppingCart } from "react-icons/ti";
import Home from "./home/Home";
import Profile from "./userOptions/Profile";
import Admin from "./admin/Admin";
import AdminUsers from "./admin/AdminUsers";
import AdminProducts from "./admin/AdminProducts";
import AdminTransactions from "./admin/AdminTransactions";
import AdminDatas from "./admin/AdminDatas";
import Search from "./purchase/Search";
import ViewProduct from "./purchase/ViewProduct";
import BuyProduct from "./purchase/BuyProduct";
import ShoppingCart from "./purchase/ShoppingCart";
import PublishProduct from "./userOptions/PublishProduct";
import ProfilePurchases from "./userOptions/ProfilePurchases";
import EditSales from "./userOptions/EditSales";
import ProfileSales from "./userOptions/ProfileSales";

const URL = import.meta.env.VITE_REACT_APP_API_URL;

function Principal({ mode }) {
  const shoppingContext = JSON.parse(localStorage.getItem("shoppingContext"));
  const [user, setUser] = useState(null);
  const [showOptionsUser, setShowOptionsUser] = useState(false);
  const [input, setInput] = useState("");
  const [showProducts, setShowProducts] = useState(false);
  const [productsIdNames, setProductsIdNames] = useState([]);
  const [productsFilter, setProductsFilter] = useState([]);
  const navigate = useNavigate();
  const blurTimeout = useRef(null);

  // Manejo de estados para rediriguir a las distintas rutas
  let modeStatus = {
    home: mode === "",
    profile: mode === "profile",
    admin: mode === "admin",
    adminUsers: mode === "adminUsers",
    adminProducts: mode === "adminProducts",
    adminTransactions: mode === "adminTransactions",
    adminDatas: mode === "adminDatas",
    search: mode === "search",
    product: mode === "product",
    buyProduct: mode === "buyProduct",
    shoppingCart: mode === "shoppingCart",
    publishProduct: mode === "publishProduct",
    editSales: mode === "editSales",
    profileSales: mode === "profileSales",
    profilePurchases: mode === "profilePurchases",
  };

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
        } catch (error) {
          localStorage.removeItem("token");
        }
      }
      if (!modeStatus.admin) {
        const response = await axios.get(`${URL}/productsIdNames`);
        if (response.status === 200) {
          setProductsIdNames(response.data);
        }
      }
    };
    fetchData();
  }, []);

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
    <div className="principal flex">
      {/* Header */}
      <header className="flex">
        <Link
          to={user && user.role === "admin" ? "/admin" : "/"}
          className="flex principalBtn"
        >
          <img className="logo" src="/icon.png" alt="Icon" />
          <h1>EcoMercado</h1>
        </Link>

        <div className="flex searchBar">
          {(!user || user.role === "client") && (
            <form className="flex" onSubmit={goSearchInterface}>
              <input
                className="input"
                type="text"
                placeholder="Search for what you want"
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                onFocus={() => setShowProducts(true)}
                onBlur={handleInputBlur}
              />
              <button type="submit" className="flex">
                <IoIosSearch className="icon" />
              </button>
            </form>
          )}
          {showProducts && (
            <div className="suggestContainer flex">
              {productsFilter.slice(0, 10).map((product, id) => (
                <Link key={id} to={`/product/${product.id}`}>
                  {product.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="flex">
          {user ? (
            <button
              className="btn btnLogin"
              onMouseEnter={() => setShowOptionsUser(true)}
              onMouseLeave={() => setShowOptionsUser(false)}
            >
              {user.email}
            </button>
          ) : (
            <Link className="btn btnLogin" to="/login">
              Log in or register
            </Link>
          )}
          {shoppingContext && (
            <button
              className="btn btnCart flex"
              onClick={() => navigate("/shoppingCart")}
            >
              <TiShoppingCart />
              <span className="flex">{shoppingContext.length}</span>
            </button>
          )}
          {showOptionsUser && (
            <div
              className="optionsUser flex"
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

      {modeStatus.home && <Home />}

      {modeStatus.profile && <Profile />}

      {modeStatus.admin && <Admin />}

      {modeStatus.adminUsers && <AdminUsers />}

      {modeStatus.adminProducts && <AdminProducts />}

      {modeStatus.adminTransactions && <AdminTransactions />}

      {modeStatus.adminDatas && <AdminDatas />}

      {modeStatus.search && <Search />}

      {modeStatus.product && <ViewProduct />}

      {modeStatus.buyProduct && <BuyProduct />}

      {modeStatus.shoppingCart && <ShoppingCart />}

      {modeStatus.publishProduct && <PublishProduct />}

      {modeStatus.editSales && <EditSales />}

      {modeStatus.profileSales && <ProfileSales />}

      {modeStatus.profilePurchases && <ProfilePurchases />}

      {/* Footer */}
      {(!user || user.role === "client") && (
        <footer className="flex">
          <p>Copyright © {new Date().getFullYear()} Country Ltd.</p>
          <p>Street ### Number #### City, Country</p>
        </footer>
      )}
    </div>
  );
}

export default Principal;
