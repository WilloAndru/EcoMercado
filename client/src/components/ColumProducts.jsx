import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";

const URI = import.meta.env.VITE_API_URL;

function ColumProducts({ product }) {
  const handleDeleteClick = async () => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete the product ${product.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await axios.delete(`${URI}/deleteProduct/${product.id}`);
      window.location.reload();
    }
  };

  return (
    <tr>
      <td className="center">{product.id}</td>
      <td>{product.name}</td>
      <td>
        <img src={product.image} alt={product.name} />
      </td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td>{product.quantity}</td>
      <td>{product.categoryId}</td>
      <td>{product.createdAt}</td>
      <td>{product.updatedAt}</td>
      <td className="center">
        <button onClick={handleDeleteClick}>
          <MdDeleteForever className="icon" />
        </button>
      </td>
    </tr>
  );
}

export default ColumProducts;
