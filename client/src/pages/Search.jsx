import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import axios from 'axios';
import ListProducts from '../components/ListProducts';

const URI = process.env.REACT_APP_API_URL;

function Search() {

  const valueName = localStorage.getItem('valueInput');
  const [idCategory, setIdCategory] = useState(+localStorage.getItem('idCategory'));
  const [products, setProducts] = useState([]);
  const [productsFilter, setProductsFilter] = useState([]);
  const [categoriesName, setCategoriesName] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(`${URI}/products`);
      if (valueName) {
        const filter = res.data.filter(p => p.name.toLowerCase().includes(valueName));
        setProducts(filter)
        setProductsFilter(filter)
      } else if (idCategory) {
        const filter = res.data.filter(p => p.categoryId === idCategory)
        setSelectedCategory(idCategory)
        setProducts(res.data)
        setProductsFilter(filter)
      }
    }
    getProducts()
    const getCategoriesName = async () => {
      const res = await axios.get(`${URI}/categories`);
      setCategoriesName(res.data);
    }
    getCategoriesName()
  }, [])

  useEffect(() => {
    let filtered = products.filter(p => p.categoryId === selectedCategory || selectedCategory === null);

    if (sortOrder === 'menorprecio') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'mayorprecio') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    setProductsFilter(filtered);
  }, [selectedCategory, sortOrder]);

  const handleSortChange = (value) => {
    setSortOrder(value.value);
  }

  const handleCategoryChange = (value) => {
    setSelectedCategory(value.value);
    setIdCategory(value.value)
  }

  const categoryName = () => {
    const result = categoriesName.filter(c => c.id === idCategory);
    return result.length > 0 ? result[0].name : '';
  }

  return (
    <div className='search page'>

      <div className='filters flex'>

        <div className='flex conteiner'>
          <h2>{valueName ? valueName.charAt(0).toUpperCase() + valueName.slice(1) : categoryName()}</h2>
          <p>{productsFilter.length} resultados</p>
        </div>

        <div className='flex conteiner'>
          <h3>Ordenar por precio</h3>
          <Select
            classNamePrefix='select'
            className='selectContainer'
            options={[
              { value: 'menorprecio', label: 'Menor precio' },
              { value: 'mayorprecio', label: 'Mayor precio' }
            ]}
            onChange={handleSortChange}
          />
        </div>

        <div className='flex conteiner'>
          <h3>Ordenar por categorias</h3>
          <Select
            classNamePrefix='select'
            className='selectContainer'
            options={
              categoriesName.map(c => {
                return { value: c.id, label: c.name }
              })}
            onChange={handleCategoryChange}
          />
        </div>

      </div>

      <ListProducts listProducts={productsFilter} />

    </div>
  )
}

export default Search