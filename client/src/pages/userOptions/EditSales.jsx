import React, { useState, useEffect } from "react";
import ListProducts from "../../components/ListProducts";
import axios from "axios";
import { RiPlantLine } from "react-icons/ri";

const URI = import.meta.env.VITE_API_URL;

function EditSales() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getProductsSales = async () => {
      const res = await axios.get(`${URI}/salesProducts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data);
    };
    getProductsSales();
  }, []);

  return (
    <div className="profilePurchases page flex1">
      {products.length > 0 ? (
        <div className="divPurchases flex1">
          <h1>Published Sales</h1>

          <ListProducts mode="sales" listProducts={products} />
        </div>
      ) : (
        <div className="divPurchases2 flex1">
          <RiPlantLine className="icon" />
          <h1>You haven't published any sales yet</h1>
        </div>
      )}
    </div>
  );
}

export default EditSales;
