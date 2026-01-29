import { useEffect, useState } from "react";
import ColumTransactions from "../../components/ColumnTransactions";
import { api } from "../../api/api";

function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await api.get(`/transactions`);
      setTransactions(res.data);
    };
    fetchTransactions();
  }, []);

  const keys = Object.keys(transactions[0] || {});

  const listTransactions = transactions.map((transaction) => {
    return <ColumTransactions key={transaction.id} transaction={transaction} />;
  });

  return (
    <table
      cellSpacing="0"
      className="-mt-20 w-screen -mx-[2vw] border border-gray-600 border-collapse"
    >
      <thead className="bg-primary text-white">
        <tr className="divide-x divide-gray-600">
          <th className="px-4 capitalize">{keys[0]}</th>
          <th className="px-4 capitalize">{keys[1]}</th>
          <th className="px-4 capitalize">{keys[2]}</th>
          <th className="px-4 capitalize">{keys[3]}</th>
          <th className="px-4 capitalize">{keys[4]}</th>
          <th className="px-4 capitalize">{keys[5]}</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-600">{listTransactions}</tbody>
    </table>
  );
}

export default AdminTransactions;
