import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
import { validateCreditCard } from "../../utils/validateCreditCard";
import { api } from "../../api/api";

function BuyProduct() {
  const { type } = useParams();
  const shoppingContext = JSON.parse(localStorage.getItem("shoppingContext"));
  const buyNow = JSON.parse(localStorage.getItem("buyNow"));
  const [error, setError] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  let products = type === "product" ? [buyNow] : shoppingContext;

  useEffect(() => {
    let totalPriceVar = 0;
    products.forEach((p) => {
      totalPriceVar += p.price * p.quantity;
    });
    setTotalPrice(totalPriceVar);
  }, []);

  const handleCardNumberChange = (e) => {
    const input = e.target.value.replace(/\s+/g, "").slice(0, 16);
    const formattedCardNumber = input.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formattedCardNumber);
  };

  const handleExpiryDateChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");

    if (input.length >= 2) {
      input = `${input.slice(0, 2)}/${input.slice(2, 4)}`;
    }

    setExpiryDate(input);
  };

  const handleSuccessBuy = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const validationMessage = validateCreditCard(
      formData.get("cardNumber"),
      formData.get("expiryDate"),
      formData.get("cvv"),
      formData.get("cardHolderName"),
    );
    if (validationMessage) {
      setError(validationMessage);
    } else {
      const handleCreateIncome = async () => {
        const res = await api.post(
          `/createIncome`,
          {
            products: products.map((p) => ({
              product_id: p.id,
              quantity: p.quantity,
              income: p.price * p.quantity * 1.1,
            })),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (res.status === 200) {
          products.length >= 1
            ? localStorage.removeItem("shoppingContext")
            : null;
          alert("Successful payment");
          navigate("/profilePurchases");
        }
      };
      handleCreateIncome();
    }
  };

  const trStyle = "flex justify-between gap-8 p-4 pb-0";

  return (
    <div className="flex gap-8 justify-center items-start">
      <div className="flex flex-col">
        <span className={error ? "showMessage" : "hiddenMessage"}>{error}</span>

        <form
          className="bg-white p-4 rounded-2xl flex flex-col gap-4 justify-center"
          onSubmit={handleSuccessBuy}
        >
          <h6>Card information</h6>
          <div className="overflow-hidden border border-gray-500 rounded-xl">
            <input
              name="cardNumber"
              className="w-full p-2 border-b border-gray-500"
              value={cardNumber}
              type="text"
              placeholder="1234 1234 1234 1234"
              onChange={handleCardNumberChange}
            />
            <div>
              <input
                name="expiryDate"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                type="text"
                placeholder="MM/AA"
                className="p-2"
              />
              <input
                name="cvv"
                className="w-1/2 p-2 border-l border-gray-500"
                type="text"
                placeholder="CVV"
              />
            </div>
          </div>

          <h6>Owner's name</h6>
          <div className="overflow-hidden border rounded-xl border-gray-500">
            <input
              name="cardHolderName"
              className="w-full"
              type="text"
              placeholder="Full name"
            />
          </div>

          <button className="btn-1" type="submit">
            Buy
          </button>
        </form>
      </div>

      <table className="bg-white rounded-xl">
        <thead>
          <tr className={trStyle}>
            <th>Items</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product, i) => (
            <tr className={trStyle} key={i}>
              <td>
                {product.name}
                {product.quantity > 1 ? `${product.quantity} unidades` : ""}
              </td>
              <td>{formatPrice(product.price * product.quantity)}</td>
            </tr>
          ))}
          <tr className={trStyle}>
            <td>Shipping cost (10% of item cost)</td>
            <td>{formatPrice(totalPrice * 0.1)}</td>
          </tr>
          <tr className={`${trStyle} pb-4`}>
            <th>Total to pay</th>
            <th>{formatPrice(totalPrice * 1.1)}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BuyProduct;
