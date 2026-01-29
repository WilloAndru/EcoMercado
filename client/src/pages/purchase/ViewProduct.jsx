import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SliderContainer from "../../components/SliderContainer";
import { formatPrice } from "../../utils/formatPrice";
import { useNavigate } from "react-router-dom";
import { dateToDay } from "../../utils/dateToDays";
import { FaArrowRight } from "react-icons/fa";
import { justNameUser } from "../../utils/justNameUser";
import Swal from "sweetalert2";
import { api } from "../../api/api";

function ViewProduct() {
  const shoppingContext = JSON.parse(localStorage.getItem("shoppingContext"));
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [sellerName, setSellerName] = useState("");
  const [sellerId, setSellerId] = useState(0);
  const [user_id, setUserId] = useState(0);
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
      const res = await api.get(`/product/${id}`);
      setProduct(res.data);

      const resSeller = await api.get(`/productSeller/${id}`);
      setSellerName(justNameUser(resSeller.data.userName));
      setSellerId(resSeller.data.user_id);

      const resSuggest = await api.get(`/products`);
      const filter = resSuggest.data.filter(
        (p) => p.category_id === res.data.category_id,
      );
      setSimilarProducts(filter);

      const resUser = await api.get(`/getUserDatas`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUserId(resUser.data.id);
    };
    getProduct();
  }, [id]);

  const verifyUser = (isBuyNow) => {
    if (sellerId === user_id) {
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
        }),
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
        }),
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
    <div className="flex flex-col gap-4 items-center w-full -mt-10">
      <div className="p-5 bg-white rounded-xl gap-8 w-[81vw] flex">
        <img
          className="h-[50vh] object-cover w-1/2 rounded-xl"
          src={product.image}
          alt={product.name}
        />

        <div className="flex flex-col gap-2 items-start justify-center">
          <h1>{product.name}</h1>
          <h1>{formatPrice(product.price)}</h1>
          <p>{product.description}</p>
          <div className="flex gap-2">
            <button className="btn-1" onClick={() => verifyUser(true)}>
              Buy now
            </button>
            {!isOnCart && product.quantity !== 1 && (
              <button className="btn-1" onClick={() => verifyUser(false)}>
                Add to cart
              </button>
            )}
          </div>

          {showQuantity && (
            <div className="flex flex-col items-start gap-2">
              <p>
                How many units would you like to{" "}
                {isBuyNow ? "buy" : "add to cart"}?
              </p>

              <form
                className="flex rounded-2xl overflow-hidden border"
                onSubmit={handleSubmit}
              >
                <input
                  type="number"
                  className="w-[12vw]"
                  min="1"
                  max={`${product.quantity}`}
                  placeholder={`Up to ${product.quantity} units`}
                  value={units}
                  onChange={() => setUnits(event.target.value)}
                  required
                />
                <button className="btn-1 h-full" type="submit">
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
