import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ColumTransactions from '../components/ColumnTransactions';

const URL = import.meta.env.VITE_REACT_APP_API_URL;

function AdminTransactions() {
  
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {    
    const fetchTransactions = async () => {
      const res = await axios.get(`${URL}/transactions`); 
      setTransactions(res.data);
    };
    fetchTransactions();
  }, []);

  const keys = Object.keys(transactions[0] || {});

  const listUsers = transactions.map(transaction => {
    return (
      <ColumTransactions
        key={transaction.id}
        transaction={transaction}
      />
    )
  })

  return (
    <table cellSpacing="0" className='adminUsers'>
      <thead>
        <tr>
          <th>{keys[0]}</th>
          <th>{keys[1]}</th>
          <th>{keys[2]}</th>
          <th>{keys[3]}</th>
          <th>{keys[4]}</th>
          <th>{keys[5]}</th>
        </tr>
      </thead>
      <tbody>
        {listUsers}
      </tbody>
    </table>
  )
}


export default AdminTransactions