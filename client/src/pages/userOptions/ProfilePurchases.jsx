import React, { useState, useEffect } from "react";
import ListProducts from "../../components/ListProducts";
import axios from "axios";
import { RiPlantLine } from "react-icons/ri";

const URI = import.meta.env.VITE_API_URL;

function ProfilePurchases() {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getProductsBought = async () => {
      const res = await axios.get(`${URI}/purchasesProducts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data.products);
      setTransactions(res.data.transactions);
    };
    getProductsBought();
  }, []);

  return (
    <div className="profilePurchases page flex1">
      {products.length > 0 ? (
        <div className="divPurchases flex1">
          <h1>Completed Purchases</h1>

          <ListProducts
            mode="purchases"
            listProducts={products}
            listTransactions={transactions}
          />
        </div>
      ) : (
        <div className="divPurchases2 flex1">
          <RiPlantLine className="icon" />
          <h1>You haven't made any purchases yet</h1>
        </div>
      )}
    </div>
  );
}

export default ProfilePurchases;
