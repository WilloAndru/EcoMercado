import { useEffect, useState } from "react";
import SliderContainer from "../../components/SliderContainer";
import axios from "axios";

const URI = import.meta.env.VITE_REACT_APP_API_URL;
const COMPANY = import.meta.env.VITE_YOUR_COMPANY;

function Home() {
  const [bestSellers, setBestSellers] = useState([]);
  const [latest, setLatest] = useState([]);
  const [forDay, setForDay] = useState([]);
  const [categories, setCategories] = useState([]);

  const getDayNumber = () => {
    const dayOfWeek = new Date().getDay();

    return dayOfWeek === 0 ? 7 : dayOfWeek;
  };

  useEffect(() => {
    const getDatas = async () => {
      const resCategories = await axios.get(`${URI}/categories`);
      setCategories(resCategories.data);
      const resBestSellers = await axios.get(`${URI}/bestSellers`);
      setBestSellers(resBestSellers.data);
      const resLatest = await axios.get(`${URI}/latest`);
      setLatest(resLatest.data);
      const resForDay = await axios.post(`${URI}/forDay`, {
        categoryId: getDayNumber(),
      });
      setForDay(resForDay.data);
    };
    getDatas();
  }, []);

  return (
    <div className="page home flex">
      <h1>Buy and Sell Sustainable Products on {COMPANY}</h1>

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
