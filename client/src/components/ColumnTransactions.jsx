function ColumTransactions({ transaction }) {
  return (
    <tr>
      <td className="center">{transaction.id}</td>
      <td>{transaction.user_id}</td>
      <td>{transaction.product_id}</td>
      <td>{transaction.type}</td>
      <td>{transaction.income}</td>
      <td>{transaction.quantity}</td>
    </tr>
  );
}

export default ColumTransactions;
