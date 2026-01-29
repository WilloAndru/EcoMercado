import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { api } from "../api/api";

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
      await api.delete(`/deleteProduct/${product.id}`);
      window.location.reload();
    }
  };

  return (
    <tr className="divide-x divide-gray-600">
      <td className="px-4 py-2 text-center">{product.id}</td>
      <td className="px-4">{product.name}</td>
      <td>
        <img
          className="w-24 h-16 object-cover"
          src={product.image}
          alt={product.name}
        />
      </td>
      <td className="px-4">{product.description}</td>
      <td className="px-4">{product.price}</td>
      <td className="px-4">{product.quantity}</td>
      <td className="px-4">{product.category_id}</td>
      <td className="px-4">
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

export default ColumProducts;
