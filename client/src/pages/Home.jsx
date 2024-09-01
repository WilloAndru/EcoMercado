import React , { useEffect, useState } from 'react'
import SliderContainer from '../components/SliderContainer';
import axios from 'axios';

const URI = import.meta.env.VITE_REACT_APP_API_URL;

function Home() {

  const [bestSellers, setBestSellers] = useState([]);
  const [latest, setLatest] = useState([]);
  const [forDay, setForDay] = useState([]);
  const [categories, setCategories] = useState([]);

  const getDayNumber = () => {
    const dayOfWeek = new Date().getDay();
    
    return (dayOfWeek === 0) ? 7 : dayOfWeek;
  }

  useEffect(() => {
    const getDatas = async () => {
      const resCategories = await axios.get(`${URI}/categories`);
      setCategories(resCategories.data);
      const resBestSellers = await axios.get(`${URI}/bestSellers`)
      setBestSellers(resBestSellers.data);
      const resLatest = await axios.get(`${URI}/latest`);
      setLatest(resLatest.data);   
      const resForDay = await axios.post(`${URI}/forDay`, {
        categoryId: getDayNumber()
      });
      setForDay(resForDay.data);
    }
    getDatas()
  }, []);

  return (
    <div className='page home flex'>

      <h1>Compra y vende articulos sostenibles en EcoMercado</h1>

      <SliderContainer
        className='category' 
        title='Categorias' 
        list={categories || []}
      />

      <SliderContainer
        className='product' 
        title='Los mas vendidos' 
        list={bestSellers || []}
      />

      <SliderContainer
        className='product' 
        title='Descubre lo mas nuevo' 
        list={latest || []}
      />

      <SliderContainer
        className='product' 
        title='Seleccion del dia' 
        list={forDay || []}
      />
  
    </div>
  )
}

export default Home