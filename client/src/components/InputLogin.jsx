import React from 'react'

function InputLogin(props) {
  return (
    <div className='inputContainer flex'>
      <label>{props.label}</label>
      <div className="inputDiv flex">
        {props.icon}
        <input
          className='input'
          type={props.type}
          placeholder={props.placeholder}
          onChange={props.onChange}
          required
        />
      </div>
    </div>
  )
}

export default InputLogin