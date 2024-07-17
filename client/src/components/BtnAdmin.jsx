import React from 'react'
import { Link } from 'react-router-dom'

function BtnAdmin(props) {
  return (
    <Link className='flex btn' to={`/admin/${props.link}`}>
        <h2>{props.title}</h2>
        {props.icon}
    </Link>
  )
}

export default BtnAdmin