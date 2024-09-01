import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ListProducts from '../components/ListProducts';
import { useNavigate } from 'react-router-dom';

const URI = import.meta.REACT_APP_API_URL;

function ShoppingCart() {

  const shoppingContext = JSON.parse(localStorage.getItem("shoppingContext"))
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const ids = shoppingContext.map(i => i.id);
      const res = await axios.post(`${URI}/shoppingCart`, { ids })
      if (res.status === 200) {
        setProducts(res.data)
      }
    }
    fetchProducts();
  }, [])

  const cleanContext = () => {
    localStorage.removeItem("shoppingContext")
    navigate("/")
  }

  return (
    <div className='shoppingCart page flex'>

      <h1>Articulos del carrito</h1>

      <ListProducts
        mode="shoppingCart"
        listProducts={products}
      />

      <div className='flex div1'>
        <button className='btn' onClick={cleanContext}>Vaciar Carrito</button>
        <button className='btn' onClick={() => navigate("/buyProduct/products")}>Realizar compra</button>
      </div>

    </div>
  )
}

export default ShoppingCart