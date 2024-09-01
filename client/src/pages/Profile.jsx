import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InputComponent from '../components/InputProfile';

const URL = import.meta.env.VITE_REACT_APP_API_URL;

function Profile() {

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get(`${URL}/getUserDatas`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
        setUser(response.data);
      }
    }
    fetchUser();
  }, [])

  const datas = [
    { name: "Correo", content: user.email, disabled: true },
    {
      attribute: "password",
      name: "Contraseña",
      content: "********",
      link: "/confirmEmail",
      disabled: user.role === "admin"
    },
    { attribute: "address", name: "Direccion", content: user.address },
    { attribute: "phone", name: "Telefono", content: user.phone },
  ]

  const inputs = datas.map((data, i) => {
    return (
      <InputComponent
        key={i}
        attribute={data.attribute || ""}
        label={data.name}
        content={data.content}
        disabled={data.disabled}
        link={data.link}
      />
    )
  })

  return (
    <div className='profile page flex'>
      {inputs}
    </div>
  )
}

export default Profile