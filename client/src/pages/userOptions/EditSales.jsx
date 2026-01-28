import { useState, useEffect } from "react";
import { RiPlantLine } from "react-icons/ri";
import { api } from "../../api/api";
import { formatPrice } from "../../utils/formatPrice";
import { useNavigate } from "react-router-dom";

function EditSales() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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

  const deleteProduct = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete the product?",
    );

    if (!confirmed) return;

    try {
      await api.delete(`/deleteProduct/${id}`);
      alert("Product deleted");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Error deleting product");
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      {products.length > 0 ? (
        <div className="flex flex-col gap-4 md:w-2/3 max-w-300">
          <h1>Published Sales</h1>
          <div className="flex flex-col p-4 rounded-xl bg-white gap-4">
            {products.map((p, i) => (
              <div key={i} className="flex justify-between gap-6">
                <div className="flex gap-6 items-center">
                  <img
                    className="w-60 max-h-40 rounded-xl object-cover"
                    src={p.image}
                    alt="img"
                  />
                  <div>
                    <h2>{p.name}</h2>
                    <h3>{formatPrice(p.price)}</h3>
                    <h4>Available Units: {p.quantity}</h4>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-2">
                  <button
                    className="btn-1 h-full"
                    onClick={() => navigate(`/publishProduct/${p.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-red h-full"
                    onClick={() => deleteProduct(p.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
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
