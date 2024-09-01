import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import axios from 'axios';
import Swal from 'sweetalert2';

const URI = import.meta.env.VITE_REACT_APP_API_URL;

function ColumProducts({ product }) {
  const imageUrl = product.image ? URL.createObjectURL(new Blob([new Uint8Array(product.image.data)], { type: 'image/jpeg' })) : '';

  const handleDeleteClick = async () => {
    const result = await Swal.fire({
      title: `¿Estás seguro de eliminar el producto ${product.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      await axios.delete(`${URI}/deleteProduct/${product.id}`);
      window.location.reload();
    }
  }

  return (
    <tr>
      <td className='center'>{product.id}</td>
      <td>{product.name}</td>
      <td><img src={imageUrl} alt={product.name} /></td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td>{product.quantity}</td>
      <td>{product.categoryId}</td>
      <td>{product.createdAt}</td>
      <td>{product.updatedAt}</td>
      <td className='center'>
        <button onClick={handleDeleteClick}>
          <MdDeleteForever className='icon' />
        </button>
      </td>
    </tr>
  );
}

export default ColumProducts;