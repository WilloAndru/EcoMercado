import { useEffect, useState } from "react";
import SliderContainer from "../../components/SliderContainer";
import { getHomeData } from "../../services/home.service";

function Home() {
  const [categories, setCategories] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [latest, setLatest] = useState([]);
  const [forDay, setForDay] = useState([]);

  // Carga inicial de los datos del home
  useEffect(() => {
    const loadHome = async () => {
      try {
        const data = await getHomeData();
        setCategories(data.categories);
        setBestSellers(data.bestSellers);
        setLatest(data.latest);
        setForDay(data.forDay);
      } catch (error) {
        console.error(error);
      }
    };

    loadHome();
  }, []);

  return (
    <div className="flex flex-col bg-bg gap-16 w-full pt-50 px-10 pb-16 text-center items-center">
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
