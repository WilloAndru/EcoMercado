import { useEffect, useState } from "react";
import { formatPrice } from "../../utils/formatPrice";
import { api } from "../../api/api";

function AdminDatas() {
  const profitsPorcent = 10;
  const [numUsers, setNumUsers] = useState(0);
  const [numProducts, setNumProducts] = useState(0);
  const [bestSellers, setBestSellers] = useState([]);
  const [profits, setProfits] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api.get(`/usersCount`);
      setNumUsers(res.data);
    };
    const fetchProducts = async () => {
      const res = await api.get(`/productsCount`);
      setNumProducts(res.data);
    };
    const fetchBestSellers = async () => {
      const res = await api.get(`/bestSellers`);
      setBestSellers(res.data);
    };
    const fetchProfits = async () => {
      const res = await api.get(`/profits`);
      setProfits((res.data * profitsPorcent) / (100 + profitsPorcent));
    };
    fetchUsers();
    fetchProducts();
    fetchBestSellers();
    fetchProfits();
  }, []);

  const listProducts = bestSellers.slice(0, 5).map((p, index) => {
    return (
      <h4 key={index}>
        {index + 1}. {p.name} ({p.quantityDifference})
      </h4>
    );
  });

  const divStyle =
    "flex bg-primary rounded-2xl flex-col items-center justify-center text-white px-6 gap-2 text-center";

  return (
    <div className="grid grid-cols-2 rounded-2xl p-8 bg-white gap-4">
      <div className={divStyle}>
        <h2>Number of Registered Users</h2>
        <h1>{numUsers}</h1>
      </div>
      <div className={divStyle}>
        <h2>Number of Published Products</h2>
        <h1>{numProducts}</h1>
      </div>
      <div className={divStyle}>
        <h2>Top Selling Products</h2>
        <div className="flex flex-col gap-2">{listProducts}</div>
      </div>
      <div className={divStyle}>
        <h2>Total Earnings</h2>
        <h3>({profitsPorcent}% of total revenue)</h3>
        <h1>{formatPrice(profits)}</h1>
      </div>
    </div>
  );
}

export default AdminDatas;
