import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { formatPrice } from '../utils/formatPrice'
import { validationCredirCard } from '../utils/validationCreditCard'

const URI = import.meta.env.VITE_REACT_APP_API_URL;

function BuyProduct() {

  const { type } = useParams();
  const shoppingContext = JSON.parse(localStorage.getItem("shoppingContext"))
  const buyNow = JSON.parse(localStorage.getItem("buyNow"))
  const [error, setError] = useState("")
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate()
  let products = type === "product" ? [buyNow] : shoppingContext;

  useEffect(() => {
    let totalPriceVar = 0;
    products.forEach(p => {
      totalPriceVar += p.price * p.quantity;
    })
    setTotalPrice(totalPriceVar)
  }, [])

  const listProducts = products.map((product, i) => {
    return (
      <tr key={i}>
        <td>{product.name} {product.quantity > 1 ? `${product.quantity} unidades` : ""}</td>
        <td>{formatPrice(product.price * product.quantity)}</td>
      </tr>
    )
  })

  const handleCardNumberChange = (e) => {
    const input = e.target.value.replace(/\s+/g, '').slice(0, 16);
    const formattedCardNumber = input.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formattedCardNumber);
  };

  const handleExpiryDateChange = (e) => {
    let input = e.target.value.replace(/\D/g, '');

    if (input.length >= 2) {
      input = `${input.slice(0, 2)}/${input.slice(2, 4)}`;
    }

    setExpiryDate(input);
  };

  const handleSuccessBuy = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const validationMessage = validationCredirCard(
      formData.get('cardNumber'),
      formData.get('expiryDate'),
      formData.get('cvv'),
      formData.get('cardHolderName')
    )
    if (validationMessage) {
      setError(validationMessage)
    } else {
      const handleCreateIncome = async () => {
        const res = await axios.post(`${URI}/createIncome`,
          {
            products: products.map(p => ({
              productId: p.id,
              quantity: p.quantity,
              income: (p.price * p.quantity) * 1.1
            }))
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );
        if (res.status === 200) {
          products.length > 1 ? localStorage.removeItem("shoppingContext") : null
          alert("Pago exitoso");
          navigate("/profilePurchases");
        }
      }
      handleCreateIncome();
    }
  };

  return (
    <div className='buyProduct page flex'>

      <div className='flex leftConteiner '>

        <span className={error ? "showMessage" : "hiddenMessage"}>
          {error}
        </span>

        <form onSubmit={handleSuccessBuy}>

          <label>Informacion de la tarjeta</label>
          <div className='inputConteiner'>
            <input
              name="cardNumber"
              className='Input input1'
              value={cardNumber}
              type="text"
              placeholder='1234 1234 1234 1234'
              onChange={handleCardNumberChange}
            />
            <div>
              <input
                name="expiryDate"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                type="text"
                placeholder='MM/AA'
              />
              <input
                name="cvv"
                className='input2'
                type="text"
                placeholder='CVV' />
            </div>
          </div>

          <label>Nombre del titular</label>
          <div className='inputConteiner'>
            <input
              name="cardHolderName"
              className='Input'
              type="text"
              placeholder='Nombre completo' />
          </div>

          <button className='btn' type='submit'>Comprar</button>

        </form>

      </div>

      <table>

        <thead>
          <tr>
            <th>Articulos</th>
            <th>Precio</th>
          </tr>
        </thead>

        <tbody>
          {listProducts}
          <tr>
            <td>Coste de envio (10% coste articulos)</td>
            <td>{formatPrice(totalPrice * 0.1)}</td>
          </tr>
          <tr>
            <th>Total a pagar</th>
            <th>{formatPrice(totalPrice * 1.1)}</th>
          </tr>
        </tbody>

      </table>

    </div>
  )
}

export default BuyProduct