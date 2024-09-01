import React, { useState, useEffect } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { IoSaveOutline } from "react-icons/io5";
import axios from 'axios';
import Swal from 'sweetalert2';

const URL = process.env.REACT_APP_API_URL;

function ColumUsers({ user }) {
    const [edit, setEdit] = useState(false);
    const [role, setRole] = useState("");

    useEffect(() => {
        setRole(user.role);
    }, []);

    const handleEditClick = () => {
        setEdit(true);
    }

    const handleSaveClick = async () => {
        setEdit(false);
        await axios.post(`${URL}/users`, {
            email: user.email,
            role: role
        });
    }

    const handleDeleteClick = async () => {
        const result = await Swal.fire({
            title: `¿Estás seguro de eliminar al usuario ${user.email}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, bórralo!',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            await axios.delete(`${URL}/users/${user.email}`);
            window.location.reload();
        }
    }

    return (
        <tr>
            <td className='center'>{user.id}</td>
            <td>          
                <select value={role} onChange={(e) => setRole(e.target.value)} disabled={!edit}>
                    <option value="admin">admin</option>
                    <option value="client">client</option>
                </select>
            </td>
            <td>{user.email}</td>
            <td>{user.address}</td>
            <td>{user.phone}</td>
            <td>{user.createdAt}</td>
            <td>{user.updatedAt}</td>
            <td className='center'>
                <button onClick={edit ? handleSaveClick : handleEditClick}>
                    {edit ? <IoSaveOutline className='icon'/> : <FaEdit className='icon'/>}
                </button>
            </td>
            <td className='center'>
                <button onClick={handleDeleteClick}>
                    <MdDeleteForever className='icon'/>
                </button>
            </td>
        </tr> 
    );
}

export default ColumUsers;