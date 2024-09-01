import React, { useState } from 'react'
import { formatPrice } from '../utils/formatPrice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { arrivalDays } from '../utils/arrivalDays'

const URI = process.env.REACT_APP_API_URL;

function ListProducts({ mode, listProducts, listTransactions }) {

  const productsForPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  }

  const deleteProductShoppingCart = (id) => {
    const shoppingList = JSON.parse(localStorage.getItem("shoppingContext"));
    if (shoppingList.length > 1) {
      const updatedList = shoppingList.filter(i => i.id !== String(id))
      localStorage.setItem('shoppingContext', JSON.stringify(updatedList));
      window.location.reload()
    } else {
      localStorage.removeItem("shoppingContext")
      navigate("/")
    }
  }

  const filterQuantity = (id) => {
    if (mode === "purchases" || mode === "sold") {
      const product = listTransactions.filter(t => t.productId === id)      
      return product[0].quantity;
    } else if (mode === "shoppingCart") {
      const shoppingList = JSON.parse(localStorage.getItem("shoppingContext"));
      const product = shoppingList.filter(i => i.id === String(id))
      return product[0].quantity;
    }
  }

  const setStatePurchases = (id) => {
    let transaction = listTransactions.filter(t => t.productId === id)
    transaction = transaction[0].createdAt
    return arrivalDays(transaction)
  }

  const deleteProduct = (id) => {
    const confirmed = window.confirm("¿Estas seguro de eliminar el producto?")
    if (confirmed) {
      const deleteProduct = async () => {
        const res = await axios.delete(`${URI}/deleteProduct/${id}`)
        if (res.status === 200) {
          alert("Producto eliminado");
          window.location.reload();
        }
      };
      deleteProduct();
    }
  }

  const ListProducts = (listProducts
    .slice((currentPage - 1) * productsForPage, currentPage * productsForPage)
    .map(p => {
      const blob = new Blob([new Uint8Array(p.image.data)], { type: 'image/jpeg' });
      const imageUrl = URL.createObjectURL(blob);
      return (
        <div
          key={p.id}
          className={mode ? 'flex productComp1' : 'flex productComp2'}
          onClick={() => !mode ? navigate(`/product/${p.id}`) : null}
        >

          <div className='flex'>

            <img src={imageUrl} alt='img' />

            <div className='flex div'>

              <h2>{p.name}</h2>

              {(!mode || mode === "sales") && <h3>{formatPrice(p.price)}</h3>}
              {mode === "shoppingCart" && <h3>{formatPrice(p.price * filterQuantity(p.id))}</h3>}
              {mode === "purchases" && <h3>Total pagado: {formatPrice(1.1 * p.price * filterQuantity(p.id))}</h3>}
              {mode === "sold" && <h3>Ganancias: {formatPrice(p.price * filterQuantity(p.id))}</h3>}

              {mode === "shoppingCart" && <h4>Unidades: {filterQuantity(p.id)}</h4>}
              {mode === "purchases" && <h4>Unidades compradas: {filterQuantity(p.id)}</h4>}
              {mode === "sales" && <h4>Unidades disponibles: {p.quantity}</h4>}
              {mode === "sold" && <h4>Unidades vendidas: {filterQuantity(p.id)}</h4>}

              {mode === "purchases" && <h4>{setStatePurchases(p.id)}</h4>}

            </div>

          </div>

          <div className='flex div'>
            {mode === "shoppingCart" && <button className="red" onClick={() => deleteProductShoppingCart(p.id)}>Descartar</button>}
            {mode === "sales" && <button onClick={() => navigate(`/publishProduct/${p.id}`)}>Editar</button>}
            {mode === "sales" && <button className="red" onClick={() => deleteProduct(p.id)}>Eliminar</button>}
          </div>

        </div>
      )
    }))

  const listBtnPages = Array.from({ length: Math.ceil(listProducts.length / productsForPage) }, (_, i) => {
    const isDisabled = currentPage === i + 1;
    return (
      <button
        key={i}
        className={`btn ${isDisabled ? 'disabled' : ''}`}
        onClick={() => handlePageChange(i + 1)}
        disabled={isDisabled}
      >
        {i + 1}
      </button>
    );
  });

  return (
    <div className='listProducts flex'>

      <div className='flex div1'>{ListProducts}</div>

      {listProducts.length > productsForPage &&
        <div className='div2 flex'>{listBtnPages}</div>
      }

    </div>
  )
}

export default ListProducts