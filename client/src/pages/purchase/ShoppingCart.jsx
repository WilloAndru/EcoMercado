import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { formatPrice } from "../../utils/formatPrice";

function ShoppingCart() {
  const shoppingContext = JSON.parse(localStorage.getItem("shoppingContext"));
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const ids = shoppingContext.map((i) => i.id);
        const res = await api.post("/shoppingCart", { ids });
        setProducts(res.data);
      } catch (error) {
        alert("Something went wrong while getting products on shoppping cart.");
      }
    };
    fetchProducts();
  }, []);

  const cleanContext = () => {
    localStorage.removeItem("shoppingContext");
    navigate("/");
  };

  return (
    <div className="flex flex-col gap-4 md:w-2/3 max-w-180 items-center justify-center">
      <h1>Cart items</h1>
      <div className="flex flex-col p-4 rounded-xl bg-white gap-4">
        {products.map((p, i) => (
          <div key={i} className="flex items-center gap-6">
            <img
              className="w-60 max-h-40 rounded-xl object-cover"
              src={p.image}
              alt="img"
            />
            <div className="flex flex-col gap-2">
              <h2>{p.name}</h2>
              <h4>{formatPrice(p.price)}</h4>
            </div>
          </div>
        ))}
        <div className="flex gap-4">
          <button className="btn-red w-full" onClick={cleanContext}>
            Empty Cart
          </button>
          <button
            className="btn-1 w-full"
            onClick={() => navigate("/buyProduct/products")}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
