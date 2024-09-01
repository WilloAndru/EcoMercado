import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { formatPrice } from '../utils/formatPrice';

const URI = process.env.REACT_APP_API_URL;

function AdminDatas() {
  const profitsPorcent = 10;
  const [numUsers, setNumUsers] = useState(0);
  const [numProducts, setNumProducts] = useState(0);
  const [bestSellers, setBestSellers] = useState([]);
  const [profits, setProfits] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`${URI}/usersCount`)
      setNumUsers(res.data)
    }
    const fetchProducts = async () => {
      const res = await axios.get(`${URI}/productsCount`)
      setNumProducts(res.data)
    }
    const fetchBestSellers = async () => {
      const res = await axios.get(`${URI}/bestSellers`)
      setBestSellers(res.data)
    }
    const fetchProfits = async () => {
      const res = await axios.get(`${URI}/profits`)  
      setProfits((res.data * profitsPorcent) / (100 + profitsPorcent))
    }
    fetchUsers()
    fetchProducts()
    fetchBestSellers()
    fetchProfits()
  }, [])

  const listProducts = bestSellers.slice(0, 5).map((p, index) => {
    return (
      <h4 key={index}>{index + 1}. {p.name} ({p.quantityDifference})</h4>
    )
  })

  return (
    <div className='adminDatas flex'>
      <div className='div flex'>
        <h2>Numero de usuarios registrados</h2>
        <h1>{numUsers}</h1>
      </div>
      <div className='div flex'>
        <h2>Numero de productos publicados</h2>
        <h1>{numProducts}</h1>
      </div>
      <div className="div flex">
        <h2>Productos mas vendidos</h2>
        <div className='divList flex'>{listProducts}</div>
      </div>
      <div className="div profits flex">
        <h2>Ganancias totales</h2>
        <h3>({profitsPorcent} % de los ingresos totales)</h3>
        <h1>{formatPrice(profits)}</h1>
      </div>
    </div>
  )
}

export default AdminDatas