import React from 'react'
import InputComponent from '../components/InputProfile';

function Profile({user}) {

  const datas = [
    {name: "Correo", content: user.email, disabled: true}, 
    { attribute: "password", 
      name: "Contraseña", 
      content: user.password, 
      link: "/confirmEmail",
      disabled: user.role === "admin"
    }, 
    {attribute: "name", name: "Nombre", content: user.name}, 
    {attribute: "address", name: "Direccion", content: user.address}, 
    {attribute: "phone", name: "Telefono", content: user.phone}, 
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
    <div className='profile flex'>
      {inputs}
    </div>
  )
}

export default Profile