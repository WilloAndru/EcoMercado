function ColumTransactions({ transaction }) {
  return (
    <tr className="divide-x divide-gray-600">
      <td className="px-4 py-2 text-center">{transaction.id}</td>
      <td className="px-4">{transaction.user_id}</td>
      <td className="px-4">{transaction.product_id}</td>
      <td className="px-4">{transaction.type}</td>
      <td className="px-4">{transaction.income}</td>
      <td className="px-4">{transaction.quantity}</td>
    </tr>
  );
}

export default ColumTransactions;
