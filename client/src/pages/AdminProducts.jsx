import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ColumProducts from '../components/ColumProducts';

const URL = import.meta.env.VITE_REACT_APP_API_URL;

function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {    
    const fetchUsers = async () => {
      const res = await axios.get(`${URL}/products`); 
      setProducts(res.data);
    };
    fetchUsers();
  }, []);

  const keys = Object.keys(products[0] || {});

  const listUsers = products.map(product => {
    return (
      <ColumProducts
        key={product.id}
        product={product}
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
          <th>{keys[6]}</th>
          <th>{keys[7]}</th>
          <th>Editar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {listUsers}
      </tbody>
    </table>
  )
}

export default AdminProducts