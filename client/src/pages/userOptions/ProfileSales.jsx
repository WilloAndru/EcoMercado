import { useState, useEffect } from "react";
import { RiPlantLine } from "react-icons/ri";
import { api } from "../../api/api";
import { formatPrice } from "../../utils/formatPrice";

function ProfileSales() {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState([]);
  const token = localStorage.getItem("token");

  const filterQuantity = (id) => {
    const qty = transactions.filter((t) => t.product_id === id);
    return qty[0].quantity;
  };

  useEffect(() => {
    const getSoldProducts = async () => {
      try {
        const res = await api.get(`/soldProducts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(res.data.products);
        setTransactions(res.data.transactions);
        // Logica para sacar el total de ganancias
        let total = 0;
        res.data.products.map((p) => {
          const qty = res.data.transactions.filter(
            (t) => t.product_id === p.id,
          )[0].quantity;
          total += qty * p.price;
        });
        console.log(total);
        setTotalRevenue(total);
      } catch (error) {
        alert("Something went wrong while getting sold products.");
      }
    };
    getSoldProducts();
  }, []);

  return (
    <div className="flex items-center justify-center w-full">
      {products.length > 0 ? (
        <div className="flex flex-col gap-4 md:w-2/3 max-w-180">
          <h1>Completed sales</h1>
          <div className="flex flex-col p-4 rounded-xl bg-white gap-4">
            {products.map((p, i) => (
              <div key={i} className="flex items-center gap-6">
                <img
                  className="w-60 max-h-40 rounded-xl object-cover"
                  src={p.image}
                  alt="img"
                />
                <div>
                  <h2>{p.name}</h2>
                  <h3>
                    Revenue: {formatPrice(p.price * filterQuantity(p.id))}
                  </h3>
                  <h4>Units Sold: {filterQuantity(p.id)}</h4>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded bg-white p-4 text-center">
            <h3>Total Revenue: {formatPrice(totalRevenue)}</h3>
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

export default ProfileSales;
