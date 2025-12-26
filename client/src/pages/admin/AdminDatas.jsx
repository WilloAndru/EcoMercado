import { useEffect, useState } from "react";
import axios from "axios";
import { formatPrice } from "../../utils/formatPrice";

const URI = import.meta.env.VITE_API_URL;

function AdminDatas() {
  const profitsPorcent = 10;
  const [numUsers, setNumUsers] = useState(0);
  const [numProducts, setNumProducts] = useState(0);
  const [bestSellers, setBestSellers] = useState([]);
  const [profits, setProfits] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`${URI}/usersCount`);
      setNumUsers(res.data);
    };
    const fetchProducts = async () => {
      const res = await axios.get(`${URI}/productsCount`);
      setNumProducts(res.data);
    };
    const fetchBestSellers = async () => {
      const res = await axios.get(`${URI}/bestSellers`);
      setBestSellers(res.data);
    };
    const fetchProfits = async () => {
      const res = await axios.get(`${URI}/profits`);
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

  return (
    <div className="adminDatas flex1">
      <div className="div flex1">
        <h2>Number of Registered Users</h2>
        <h1>{numUsers}</h1>
      </div>
      <div className="div flex1">
        <h2>Number of Published Products</h2>
        <h1>{numProducts}</h1>
      </div>
      <div className="div flex1">
        <h2>Top Selling Products</h2>
        <div className="divList flex1">{listProducts}</div>
      </div>
      <div className="div profits flex1">
        <h2>Total Earnings</h2>
        <h3>({profitsPorcent}% of total revenue)</h3>
        <h1>{formatPrice(profits)}</h1>
      </div>
    </div>
  );
}

export default AdminDatas;
