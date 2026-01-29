import { useEffect, useState } from "react";
import ColumUsers from "../../components/ColumUsers";
import { api } from "../../api/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api.get(`/users`);
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const keys = Object.keys(users[0] || {});

  const listUsers = users.map((user) => {
    return <ColumUsers key={user.id} user={user} />;
  });

  return (
    <table
      cellSpacing="0"
      className="-mt-20 -mx-[2vw] border border-gray-600 border-collapse"
    >
      <thead className="bg-primary text-white">
        <tr className="divide-x divide-gray-600">
          <th className="capitalize">{keys[0]}</th>
          <th className="capitalize">{keys[1]}</th>
          <th className="capitalize">{keys[2]}</th>
          <th className="capitalize">{keys[4]}</th>
          <th className="capitalize">{keys[5]}</th>
          <th className="capitalize">{keys[6]}</th>
          <th className="capitalize">{keys[7]}</th>
          <th>Edit</th>
          <th className="py-2">Delete</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-600">{listUsers}</tbody>
    </table>
  );
}

export default AdminUsers;
