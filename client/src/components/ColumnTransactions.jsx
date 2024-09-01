import React from 'react';

function ColumTransactions({ transaction }) {

  return (
    <tr>
      <td className='center'>{transaction.id}</td>
      <td>{transaction.userId}</td>
      <td>{transaction.productId}</td>
      <td>{transaction.type}</td>
      <td>{transaction.income}</td>
      <td>{transaction.quantity}</td>
    </tr>
  );
}

export default ColumTransactions;