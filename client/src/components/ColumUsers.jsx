import { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoSaveOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { api } from "../api/api";

function ColumUsers({ user }) {
  const [edit, setEdit] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(user.role);
  }, []);

  const handleEditClick = () => {
    setEdit(true);
  };

  const handleSaveClick = async () => {
    setEdit(false);
    await api.post(`/users`, {
      email: user.email,
      role: role,
    });
  };

  const handleDeleteClick = async () => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete the user ${user.email}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await api.delete(`/users/${user.email}`);
      window.location.reload();
    }
  };

  return (
    <tr className="divide-x divide-gray-600">
      <td className="px-4 text-center w-15">{user.id}</td>
      <td className="px-4 w-45">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          disabled={!edit}
          className="w-full rounded-md border border-gray-600 bg-white px-2 py-1 text-sm disabled:bg-gray-100"
        >
          <option value="admin">admin</option>
          <option value="client">client</option>
        </select>
      </td>
      <td className="px-4 w-75 break-all">{user.email}</td>
      <td className="px-4 w-60 break-all">{user.name}</td>
      <td className="px-4 w-100 break-all">{user.picture}</td>
      <td className="px-4 w-60 break-all">{user.addres}</td>
      <td className="px-4 py-2 w-60 break-all">{user.phone}</td>
      <td className="w-15 text-center">
        <button
          onClick={edit ? handleSaveClick : handleEditClick}
          className="text-gray-600 hover:text-primary"
        >
          {edit ? (
            <IoSaveOutline className="text-2xl" />
          ) : (
            <FaEdit className="text-2xl" />
          )}
        </button>
      </td>
      <td className="text-center w-15">
        <button
          onClick={handleDeleteClick}
          className="text-red-600 hover:text-red-700"
        >
          <MdDeleteForever className="text-2xl" />
        </button>
      </td>
    </tr>
  );
}

export default ColumUsers;
