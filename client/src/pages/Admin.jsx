import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineInventory2 } from "react-icons/md";
import BtnAdmin from '../components/BtnAdmin';

function Admin() {

  const datas = [
    { title: "Gestion de usuarios", icon: <FaUserCircle className='icon' />, link: "users" },
    { title: "Gestion de productos", icon: <MdOutlineInventory2 className='icon' />, link: "products" },
    { title: "Gestion de transacciones", icon: <TbTruckDelivery className='icon' />, link: "transactions" },
    { title: "Datos relevantes", icon: <FaMoneyBillTrendUp className='icon' />, link: "datas" },
  ]

  const buttons = datas.map((data, i) => {
    return (
      <BtnAdmin
        key={i}
        title={data.title}
        icon={data.icon}
        link={data.link}
      />
    )
  })

  return (
    <div className='admin flex'>
      <div className='flex div'>
        {buttons}
      </div>
    </div>
  )
}

export default Admin