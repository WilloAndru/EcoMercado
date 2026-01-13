import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoSaveOutline } from "react-icons/io5";
import { api } from "../api/api";

function InputComponent(props) {
  const saveEmail = useState(localStorage.getItem("saveEmail"));
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(props.content || "");

  const handleEditClick = (event) => {
    event.preventDefault();
    setEditing(true);
  };

  const handleSaveClick = async (event) => {
    event.preventDefault();
    setEditing(false);
    try {
      await api.post("/profile", {
        email: saveEmail,
        attribute: props.attribute,
        value: inputValue,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <form
      className="flex justify-between w-full items-start"
      onSubmit={editing ? handleSaveClick : handleEditClick}
    >
      <div className="flex flex-col gap-4 items-start w-full">
        <h4>{props.label}</h4>
        <input
          className={`rounded-xl border border-bg w-[80%] -ml-5 ${
            editing && "border-gray-500 ml-0"
          }`}
          value={inputValue}
          readOnly={!editing}
          placeholder={`Enter your ${props.label}`}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <button type="submit" style={{ display: props.disabled && "none" }}>
        {editing ? (
          <IoSaveOutline className="text-3xl" />
        ) : (
          <FaEdit className="text-3xl" />
        )}
      </button>
    </form>
  );
}

export default InputComponent;
