import React, { useState, useEffect } from 'react'
import ListProducts from '../components/ListProducts';
import axios from 'axios'
import { RiPlantLine } from "react-icons/ri";

const URI = import.meta.env.VITE_REACT_APP_API_URL;

function ProfileSales() {

  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getSoldProducts = async () => {
      const res = await axios.get(`${URI}/soldProducts`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(res.data.products)
      setTransactions(res.data.transactions)
    }
    getSoldProducts()
  }, [])

  return (
    <div className='profilePurchases page flex'>
      {products.length > 0 ?
        <div className='divPurchases flex'>
          <h1>Productos vendidos</h1>

          <ListProducts
            mode="sold"
            listProducts={products}
            listTransactions={transactions}
          />
        </div>
        :
        <div className='divPurchases2 flex'>
          <RiPlantLine className='icon' />
          <h1>No te han comprado productos aun</h1>
        </div>
      }
    </div>
  )
}

export default ProfileSales