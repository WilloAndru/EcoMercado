import React, { useState, useEffect } from "react";
import ListProducts from "../../components/ListProducts";
import axios from "axios";
import { RiPlantLine } from "react-icons/ri";

const URI = import.meta.env.VITE_API_URL;

function ProfileSales() {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getSoldProducts = async () => {
      const res = await axios.get(`${URI}/soldProducts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data.products);
      setTransactions(res.data.transactions);
    };
    getSoldProducts();
  }, []);

  return (
    <div className="profilePurchases page flex1">
      {products.length > 0 ? (
        <div className="divPurchases flex1">
          <h1>Sold Products</h1>

          <ListProducts
            mode="sold"
            listProducts={products}
            listTransactions={transactions}
          />
        </div>
      ) : (
        <div className="divPurchases2 flex1">
          <RiPlantLine className="icon" />
          <h1>No products have been purchased from you yet</h1>
        </div>
      )}
    </div>
  );
}

export default ProfileSales;
