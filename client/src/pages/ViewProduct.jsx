import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import SliderContainer from '../components/SliderContainer'
import { formatPrice } from '../utils/formatPrice'
import { useNavigate } from 'react-router-dom'
import { dateToDay } from '../utils/dateToDays'
import { FaArrowRight } from "react-icons/fa"
import Swal from 'sweetalert2';

const URI = process.env.REACT_APP_API_URL;

function ViewProduct() {

  const shoppingContext = JSON.parse(localStorage.getItem("shoppingContext"))
  const { id } = useParams();
  const [product, setProduct] = useState({})
  const [similarProducts, setSimilarProducts] = useState([])
  const [sellerName, setSellerName] = useState("")
  const [sellerId, setSellerId] = useState(0)
  const [userId, setUserId] = useState(0);
  const [showQuantity, setShowQuantity] = useState(false)
  const [units, setUnits] = useState("");
  const [isBuyNow, setIsBuyNow] = useState(null);
  const [isOnCart, setIsOnCart] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    if (shoppingContext) {
      const verify = shoppingContext.some(i => i.id === id)
      setIsOnCart(verify)
    }
  }, [shoppingContext])

  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get(`${URI}/product/${id}`)
      setProduct(res.data)

      const resSeller = await axios.get(`${URI}/productSeller/${id}`)
      setSellerName(resSeller.data.userName)
      setSellerId(resSeller.data.userId)
      
      const resSuggest = await axios.get(`${URI}/products`)
      const filter = resSuggest.data.filter(p =>
        p.categoryId === res.data.categoryId
      )
      setSimilarProducts(filter)

      const resUser = await axios.get(`${URI}/getUserDatas`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setUserId(resUser.data.id)            
    }
    getProduct()
  }, [id])

  const verifyUser = (isBuyNow) => {
    if (sellerId === userId) {
      alert("No puedes comprar tus propios productos")
    } else if (!localStorage.getItem("token")) {
      Swal.fire({
        title: 'No está registrado, por favor inicie sesión o regístrese',
        icon: 'info',
        imageAlt: 'Icono Ecomercado',
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonColor: '#49cb5c',
        cancelButtonColor: '#d33',
        denyButtonColor: '#49cb5c',
        confirmButtonText: 'Iniciar Sesión',
        denyButtonText: 'Registrarse',
        cancelButtonText: 'Seguir mirando'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        } else if (result.isDenied) {
          navigate("/registerEmail");
        }
      });
    }
    else {
      setIsBuyNow(isBuyNow);
      setShowQuantity(true);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isBuyNow) {
      localStorage.setItem("buyNow", JSON.stringify({ id: id, name: product.name, price: product.price, quantity: units }))
      navigate("/buyProduct/product")
    } else {
      const shoppingList = shoppingContext ? shoppingContext : [];
      const newObject = { id: id, name: product.name, price: product.price, quantity: units };
      shoppingList.push(newObject);
      localStorage.setItem('shoppingContext', JSON.stringify(shoppingList));
      window.location.reload()
    }
  }

  const imageUrl = product.image ? URL.createObjectURL(new Blob([new Uint8Array(product.image.data)], { type: 'image/jpeg' })) : '';

  return (
    <div className='viewProduct page flex'>

      <div className="viewProduct1 flex">

        <img src={imageUrl} alt={product.name} />

        <div className='productInfo flex'>

          <h1>{product.name}</h1>

          <h1>{formatPrice(product.price)}</h1>

          <p>{product.description}</p>

          <div className='flex'>
            <button className='btn' onClick={() => verifyUser(true)}>
              Comprar ahora
            </button>
            {!isOnCart &&
              <button className='btn' onClick={() => verifyUser(false)}>
                Añadir al carrito
              </button>
            }
          </div>

          {showQuantity &&
            <div className='showQuantity'>

              <p>¿Cuantas unidades deseas {isBuyNow ? "comprar" : "añadir al carrito"}?</p>

              <form onSubmit={handleSubmit}>
                <input
                  type="number"
                  min="1"
                  max={`${product.quantity}`}
                  placeholder={`Hasta ${product.quantity} unidades`}
                  value={units}
                  onChange={() => setUnits(event.target.value)}
                  required
                />
                <button type='submit'><FaArrowRight /></button>
              </form>

            </div>
          }

          <p>Vendido por <b>{sellerName}</b> hace <b> {dateToDay(product.createdAt)} dias</b></p>

          <p>Quedan <b>{product.quantity}</b> unidades</p>

        </div>

      </div>

      <SliderContainer
        className='product'
        title='Similares'
        list={similarProducts || []}
      />

    </div>
  )
}

export default ViewProduct