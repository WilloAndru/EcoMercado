import React, { useEffect, useState } from 'react';
import api from '../services/api'

const ProtectedComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/protected');
        setData(response.data);
      } catch (error) {
        alert('Acceso denegado');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Protected Content</h1>
      {data && <p>{data.message}</p>}
    </div>
  );
};

export default ProtectedComponent;