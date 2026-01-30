import { useState, useEffect } from "react";
import Select from "react-select";
import { api } from "../../api/api";
import { formatPrice } from "../../utils/formatPrice";
import { Link } from "react-router-dom";

function Search() {
  const valueName = localStorage.getItem("valueInput");
  const [idCategory, setIdCategory] = useState(
    +localStorage.getItem("idCategory"),
  );
  const [products, setProducts] = useState([]);
  const [productsFilter, setProductsFilter] = useState([]);
  const [categoriesName, setCategoriesName] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsForPage = 10;

  useEffect(() => {
    const getProducts = async () => {
      const res = await api.get(`/products`);
      if (idCategory) {
        const filter = res.data.filter((p) => p.category_id === idCategory);
        setSelectedCategory(idCategory);
        setProducts(res.data);
        setProductsFilter(filter);
        return;
      } else if (valueName) {
        const filter = res.data.filter((p) =>
          p.name.toLowerCase().includes(valueName),
        );
        setProducts(filter);
        setProductsFilter(filter);
      }
    };
    getProducts();
    const getCategoriesName = async () => {
      const res = await api.get(`/categories`);
      setCategoriesName(res.data);
    };
    getCategoriesName();
  }, []);

  useEffect(() => {
    let filtered = products.filter(
      (p) => p.category_id === selectedCategory || selectedCategory === null,
    );

    if (sortOrder === "menorprecio") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "mayorprecio") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    setProductsFilter(filtered);
  }, [selectedCategory, sortOrder]);

  const handleSortChange = (value) => {
    setSortOrder(value.value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value.value);
    setIdCategory(value.value);
  };

  const categoryName = () => {
    const result = categoriesName.filter((c) => c.id === idCategory);
    return result.length > 0 ? result[0].name : "";
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex -mt-15 w-full justify-center">
      <div className="flex flex-col items-start h-fit mr-5 gap-8 p-8 w-50 md:w-100 rounded-xl bg-white">
        <div className="w-full flex flex-col items-start">
          <h2>
            {valueName
              ? valueName.charAt(0).toUpperCase() + valueName.slice(1)
              : categoryName()}
          </h2>
          <p>{productsFilter.length} results</p>
        </div>
        <div className="w-full flex flex-col gap-2 items-start">
          <h3>Sort by price</h3>
          <Select
            classNamePrefix="select"
            className="w-full"
            options={[
              { value: "menorprecio", label: "Lower price" },
              { value: "mayorprecio", label: "Higher price" },
            ]}
            onChange={handleSortChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2 items-start">
          <h3>Sort by categories</h3>
          <Select
            classNamePrefix="select"
            className="w-full"
            options={categoriesName.map((c) => {
              return { value: c.id, label: c.name };
            })}
            onChange={handleCategoryChange}
          />
        </div>
      </div>
      <div className="w-200 flex flex-col items-center p-4 rounded-xl bg-white gap-4">
        {productsFilter
          .slice(
            (currentPage - 1) * productsForPage,
            currentPage * productsForPage,
          )
          .map((p, i) => (
            <Link
              key={i}
              to={`/product/${p.id}`}
              className="flex w-full items-center gap-6 hover:bg-gray-100 rounded-xl"
            >
              <img
                className="w-60 max-h-40 rounded-xl object-cover"
                src={p.image}
                alt="img"
              />
              <div className="flex flex-col gap-2 text-start">
                <h2>{p.name}</h2>
                <h3>{formatPrice(p.price)}</h3>
              </div>
            </Link>
          ))}
        {productsFilter.length > productsForPage && (
          <div className="flex gap-2">
            {Array.from(
              { length: Math.ceil(products.length / productsForPage) },
              (_, i) => {
                const isDisabled = currentPage === i + 1;
                return (
                  <button
                    key={i}
                    className={`btn-1 ${isDisabled ? "disabled" : ""}`}
                    onClick={() => handlePageChange(i + 1)}
                    disabled={isDisabled}
                  >
                    {i + 1}
                  </button>
                );
              },
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
