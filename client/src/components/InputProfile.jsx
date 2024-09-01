import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { IoSaveOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const URL = process.env.REACT_APP_API_URL;

function InputComponent(props) {

  const [saveEmail, setSaveEmail] = useState("");
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(props.content || '');
  const navigate = useNavigate();

  useEffect(() => {
    setInputValue(props.content || '');
    setSaveEmail(localStorage.getItem('saveEmail'));
  }, [props.content]);

  const handleEditClick = (event) => {
    event.preventDefault()
    setEditing(true);
    if (props.link) {
      navigate(props.link)
      window.location.reload();
    }
  };

  const handleSaveClick = async (event) => {
    event.preventDefault();
    setEditing(false);
    await axios.post(`${URL}/profile`, {
      email: saveEmail,
      attribute: props.attribute,
      value: inputValue
    })
  };

  return (
    <form className='flex inputProfile' onSubmit={editing ? handleSaveClick : handleEditClick}>
      <div className='flex inputDiv'>
        <label>{props.label}</label>
        <input
          className={editing ? 'inputFocus' : "input"}
          value={inputValue}
          readOnly={!editing}
          onChange={e => setInputValue(e.target.value)}
        />
      </div>
      <button
        type='submit'
        style={{ display: props.disabled && "none" }}
      >
        {editing ? <IoSaveOutline className='icon' /> : <FaEdit className='icon' />}
      </button>
    </form>
  );
}

export default InputComponent;