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
    <div className="flex items-center justify-center">
      {products.length > 0 ? (
        <div className="flex flex-col gap-4">
          <h1>Published Sales</h1>
          <ListProducts mode="sales" listProducts={products} />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 text-gray-400">
          <RiPlantLine className="text-8xl" />
          <h1>You haven't published any sales yet</h1>
        </div>
      )}
    </div>
  );
}

export default EditSales;
