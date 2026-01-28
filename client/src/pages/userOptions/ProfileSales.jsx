import { useState, useEffect } from "react";
import ListProducts from "../../components/ListProducts";
import { RiPlantLine } from "react-icons/ri";
import { api } from "../../api/api";

const URI = import.meta.env.VITE_API_URL;

function ProfileSales() {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getSoldProducts = async () => {
      try {
        const res = await api.get(`${URI}/soldProducts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(res.data.products);
        setTransactions(res.data.transactions);
      } catch (error) {
        alert("Something went wrong while getting sold products.");
      }
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
        <div className="flex flex-col items-center gap-6 text-gray-400">
          <RiPlantLine className="text-8xl" />
          <h1>No products have been purchased from you yet</h1>
        </div>
      )}
    </div>
  );
}

export default ProfileSales;
