import { useEffect, useState } from "react";
import SliderContainer from "../../components/SliderContainer";
import axios from "axios";

const URI = import.meta.env.VITE_REACT_APP_API_URL;

function Home() {
  const [bestSellers, setBestSellers] = useState([]);
  const [latest, setLatest] = useState([]);
  const [forDay, setForDay] = useState([]);
  const [categories, setCategories] = useState([]);

  // Carga inicial de los datos del home
  useEffect(() => {
    const getDatas = async () => {
      // Obtener categorías
      const resCategories = await axios.get(`${URI}/categories`);
      setCategories(resCategories.data);
      // Obtener productos más vendidos
      const resBestSellers = await axios.get(`${URI}/bestSellers`);
      setBestSellers(resBestSellers.data);
      // Obtener productos más recientes
      const resLatest = await axios.get(`${URI}/latest`);
      setLatest(resLatest.data);
      // Obtener productos recomendados según el día de la semana
      const resForDay = await axios.post(`${URI}/forDay`, {
        categoryId: new Date().getDay(),
      });
      setForDay(resForDay.data);
    };
    getDatas();
  }, []);

  return (
    <div className="page home flex">
      <h1>Buy and Sell Sustainable Products on EcoMercado</h1>

      <SliderContainer
        className="category"
        title="Categories"
        list={categories || []}
      />

      <SliderContainer
        className="product"
        title="Best Sellers"
        list={bestSellers || []}
      />

      <SliderContainer
        className="product"
        title="Discover What’s New"
        list={latest || []}
      />

      <SliderContainer
        className="product"
        title="Today’s Picks"
        list={forDay || []}
      />
    </div>
  );
}

export default Home;
