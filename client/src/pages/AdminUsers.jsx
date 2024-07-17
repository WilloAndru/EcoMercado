import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ColumUsers from '../components/ColumUsers';

const URL = "http://localhost:8000/admin/users"

function AdminUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get(URL); 
            setUsers(res.data);
        };
        fetchUsers();
    }, []);

    const keys = Object.keys(users[0] || {});

    const listUsers = users.map(user => {
        return (
        <ColumUsers
            key={user.id}
            user={user}
        />
    )})

    return (
        <table cellSpacing="0" className='adminUsers'>
            <thead>
                <tr>
                <th>{keys[0]}</th>
                <th>{keys[1]}</th>
                <th>{keys[2]}</th>
                <th>{keys[4]}</th>
                <th>{keys[5]}</th>
                <th>{keys[6]}</th>
                <th>{keys[7]}</th>
                <th>{keys[8]}</th>
                <th>Editar</th>
                <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                {listUsers}
            </tbody>
        </table>
    )
}

export default AdminUsers