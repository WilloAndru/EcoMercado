import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SliderContainer from "../../components/SliderContainer";
import { formatPrice } from "../../utils/formatPrice";
import { useNavigate } from "react-router-dom";
import { dateToDay } from "../../utils/dateToDays";
import { FaArrowRight } from "react-icons/fa";
import { justNameUser } from "../../utils/justNameUser";
import Swal from "sweetalert2";

const URI = import.meta.env.VITE_REACT_APP_API_URL;

function ViewProduct() {
  const shoppingContext = JSON.parse(localStorage.getItem("shoppingContext"));
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [sellerName, setSellerName] = useState("");
  const [sellerId, setSellerId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [showQuantity, setShowQuantity] = useState(false);
  const [units, setUnits] = useState("");
  const [isBuyNow, setIsBuyNow] = useState(null);
  const [isOnCart, setIsOnCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (shoppingContext || product.quantity === 1) {
      const verify = shoppingContext.some((i) => i.id === id);
      setIsOnCart(verify);
    }
  }, [shoppingContext]);

  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get(`${URI}/product/${id}`);
      setProduct(res.data);

      const resSeller = await axios.get(`${URI}/productSeller/${id}`);
      setSellerName(justNameUser(resSeller.data.userName));
      setSellerId(resSeller.data.userId);

      const resSuggest = await axios.get(`${URI}/products`);
      const filter = resSuggest.data.filter(
        (p) => p.categoryId === res.data.categoryId
      );
      setSimilarProducts(filter);

      const resUser = await axios.get(`${URI}/getUserDatas`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUserId(resUser.data.id);
    };
    getProduct();
  }, [id]);

  const verifyUser = (isBuyNow) => {
    if (sellerId === userId) {
      alert("You can't buy your own products");
    } else if (!localStorage.getItem("token")) {
      Swal.fire({
        title: "You are not registered. Please log in or sign up",
        icon: "info",
        imageAlt: "EcoMercado Icon",
        showCancelButton: true,
        confirmButtonColor: "#49cb5c",
        cancelButtonColor: "#d33",
        denyButtonColor: "#49cb5c",
        confirmButtonText: "Log In",
        cancelButtonText: "Keep Browsing",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else if (product.quantity === 1) {
      localStorage.setItem(
        "buyNow",
        JSON.stringify({
          id: id,
          name: product.name,
          price: product.price,
          quantity: 1,
        })
      );
      navigate("/buyProduct/product");
    } else {
      setIsBuyNow(isBuyNow);
      setShowQuantity(true);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (isBuyNow) {
      localStorage.setItem(
        "buyNow",
        JSON.stringify({
          id: id,
          name: product.name,
          price: product.price,
          quantity: units,
        })
      );
      navigate("/buyProduct/product");
    } else {
      const shoppingList = shoppingContext ? shoppingContext : [];
      const newObject = {
        id: id,
        name: product.name,
        price: product.price,
        quantity: units,
      };
      shoppingList.push(newObject);
      localStorage.setItem("shoppingContext", JSON.stringify(shoppingList));
      window.location.reload();
    }
  };

  return (
    <div className="viewProduct page flex1">
      <div className="viewProduct1 flex1">
        <img src={product.image} alt={product.name} />

        <div className="productInfo flex1">
          <h1>{product.name}</h1>

          <h1>{formatPrice(product.price)}</h1>

          <p>{product.description}</p>

          <div className="flex1">
            <button className="btn" onClick={() => verifyUser(true)}>
              Buy now
            </button>
            {!isOnCart && product.quantity !== 1 && (
              <button className="btn" onClick={() => verifyUser(false)}>
                Add to cart
              </button>
            )}
          </div>

          {showQuantity && (
            <div className="showQuantity">
              <p>
                How many units would you like to{" "}
                {isBuyNow ? "buy" : "add to cart"}?
              </p>

              <form onSubmit={handleSubmit}>
                <input
                  type="number"
                  min="1"
                  max={`${product.quantity}`}
                  placeholder={`Up to ${product.quantity} units`}
                  value={units}
                  onChange={() => setUnits(event.target.value)}
                  required
                />
                <button type="submit">
                  <FaArrowRight />
                </button>
              </form>
            </div>
          )}

          <p>
            Sold by <b>{sellerName}</b> <b>{dateToDay(product.createdAt)}</b>{" "}
            days ago
          </p>

          <p>
            <b>{product.quantity}</b> units left
          </p>
        </div>
      </div>

      <SliderContainer
        className="product"
        title="Similar Products"
        list={similarProducts || []}
      />
    </div>
  );
}

export default ViewProduct;
