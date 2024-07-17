import React , { useEffect, useState } from 'react'
import SliderContainer from '../components/SliderContainer';
import axios from 'axios';

const URL = "http://localhost:8000/"

function Home() {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getDatas = async () => {
      const res = await axios.get(URL);
      setCategories(res.data.categories);
      setProducts(res.data.products);
    }
    getDatas()
  }, []);

  return (
    <div className='home flex'>

      <h1>Compra y vende articulos sostenibles en EcoMercado</h1>

      <SliderContainer
        className='category' 
        title='Categorias' 
        list={categories || []}
      />

      <SliderContainer
        className='product' 
        title='Mas vendidos' 
        list={products || []}
      />

      <SliderContainer
        className='product' 
        title='Elegidos para ti' 
        list={products || []}
      />

      <SliderContainer
        className='product' 
        title='Inspirados en tus favoritos' 
        list={products || []}
      />
  
    </div>
  )
}

export default Home