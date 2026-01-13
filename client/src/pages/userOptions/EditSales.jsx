import { useState, useEffect } from "react";
import ListProducts from "../../components/ListProducts";
import { RiPlantLine } from "react-icons/ri";
import { api } from "../../api/api";

function EditSales() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getProductsSales = async () => {
      const res = await api.get("/salesProducts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data);
    };
    getProductsSales();
  }, []);

  return (
    <div className="profilePurchases flex">
      {products.length > 0 ? (
        <div className="divPurchases flex">
          <h1>Published Sales</h1>
          <ListProducts mode="sales" listProducts={products} />
        </div>
      ) : (
        <div className="divPurchases2 flex">
          <RiPlantLine className="icon" />
          <h1>You haven't published any sales yet</h1>
        </div>
      )}
    </div>
  );
}

export default EditSales;
