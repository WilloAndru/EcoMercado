import { useEffect, useState } from "react";
import ColumProducts from "../../components/ColumProducts";
import { api } from "../../api/api";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api.get(`/products`);
      setProducts(res.data);
    };
    fetchUsers();
  }, []);

  const keys = Object.keys(products[0] || {});

  const listProducts = products.map((product) => {
    return <ColumProducts key={product.id} product={product} />;
  });

  return (
    <table
      cellSpacing="0"
      className="-mt-20 -mx-[2vw] border border-gray-600 border-collapse"
    >
      <thead className="bg-primary text-white">
        <tr className="divide-x divide-gray-600">
          <th className="px-4 capitalize">{keys[0]}</th>
          <th className="px-4 capitalize">{keys[1]}</th>
          <th className="px-4 capitalize">{keys[2]}</th>
          <th className="px-4 capitalize">{keys[3]}</th>
          <th className="px-4 capitalize">{keys[4]}</th>
          <th className="px-4 capitalize">{keys[5]}</th>
          <th className="px-4 capitalize">{keys[6]}</th>
          <th className="py-2 px-4">Delete</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-600">{listProducts}</tbody>
    </table>
  );
}

export default AdminProducts;
