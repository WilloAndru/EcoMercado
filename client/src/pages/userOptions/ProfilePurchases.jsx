import { useState, useEffect } from "react";
import { RiPlantLine } from "react-icons/ri";
import { api } from "../../api/api";
import { formatPrice } from "../../utils/formatPrice";
import { arrivalDays } from "../../utils/arrivalDays";

function ProfilePurchases() {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getProductsBought = async () => {
      try {
        const res = await api.get("/purchasesProducts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(res.data.products);
        setTransactions(res.data.transactions);
      } catch (error) {
        alert("Something went wrong while getting purchase products.");
      }
    };
    getProductsBought();
  }, []);

  const filterQuantity = (id) => {
    const qty = transactions.filter((t) => t.product_id === id);
    return qty[0].quantity;
  };

  const setStatePurchases = (id) => {
    let transaction = transactions.filter((t) => t.product_id === id);
    transaction = transaction[0].createdAt;
    return arrivalDays(transaction);
  };

  return (
    <div className="flex items-center justify-center w-full">
      {products.length > 0 ? (
        <div className="flex flex-col gap-4 md:w-2/3 max-w-180">
          <h1>Completed Purchases</h1>
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
                  <h4>
                    Total Paid:{" "}
                    {formatPrice(1.1 * p.price * filterQuantity(p.id))}
                  </h4>
                  <h4>Units Purchased: {filterQuantity(p.id)}</h4>
                  <h4>{setStatePurchases(p.id)}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 text-gray-400">
          <RiPlantLine className="text-8xl" />
          <h1>No products have been purchased from you yet</h1>
        </div>
      )}
    </div>
  );
}

export default ProfilePurchases;
