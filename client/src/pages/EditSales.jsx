import React, { useState, useEffect } from 'react'
import ListProducts from '../components/ListProducts';
import axios from 'axios';
import { RiPlantLine } from "react-icons/ri";

const URI = process.env.REACT_APP_API_URL;

function EditSales() {

  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getProductsSales = async () => {
      const res = await axios.get(`${URI}/salesProducts`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(res.data);
    }
    getProductsSales()
  }, [])

  return (
    <div className='profilePurchases page flex'>
      {products.length > 0 ?
        <div className='divPurchases flex'>
          <h1>Ventas publicadas</h1>

          <ListProducts
            mode="sales"
            listProducts={products}
          />
        </div>
        :
        <div className='divPurchases2 flex'>
          <RiPlantLine className='icon' />
          <h1>No has publicado ninguna venta</h1>
        </div>
      }


    </div>
  )
}

export default EditSales