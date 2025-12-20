import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { MdAddPhotoAlternate } from "react-icons/md";

const URI = import.meta.env.VITE_REACT_APP_API_URL;

function PublishProduct() {
  const maxName = 64;
  const maxDescription = 256;
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isChange, setIsChange] = useState(false);
  const [categoriesName, setCategoriesName] = useState([]);
  const [categoryName, setCategoryName] = useState(null);
  const [counterName, setCounterName] = useState(0);
  const [counterDescription, setCounterDescription] = useState(0);
  const navigate = useNavigate();
  const { idProduct } = useParams();

  useEffect(() => {
    let categories = [];
    const getCategoriesName = async () => {
      const res = await axios.get(`${URI}/categories`);
      categories = res.data;
      setCategoriesName(res.data);
    };
    getCategoriesName();
    if (idProduct > 0) {
      const getEditProduct = async () => {
        const res = await axios.get(`${URI}/product/${idProduct}`);
        setName(res.data.name);
        setCounterName(res.data.name.length);
        setDescription(res.data.description);
        setCounterDescription(res.data.description.length);
        handleImageChange(res.data.image.data);
        setPrice(res.data.price);
        setQuantity(res.data.quantity);
        setCategoryName(
          categories
            .filter((c) => c.id === res.data.categoryId)
            .map((c) => ({ value: c.id, label: c.name }))[0]
        );
      };
      getEditProduct();
    }
  }, []);

  const handleInputImg = () => {
    fileInputRef.current.click();
  };

  const handleButton = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.name;
    const formData = new FormData(e.target);

    if (action === "publish") {
      const createProduct = async () => {
        const resProduct = await axios.post(`${URI}/publishProduct`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (resProduct.status === 200) {
          const resTransaction = await axios.post(`${URI}/createSale`, {
            token: localStorage.getItem("token"),
            productName: formData.get("name"),
          });
          if (resTransaction.status === 200) {
            alert("Item added successfully");
            navigate("/editSales");
          }
        }
      };
      createProduct();
    } else if (action === "update") {
      const updateProduct = async () => {
        const res = await axios.patch(
          `${URI}/updateProduct/${idProduct}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (res.status === 200) {
          alert("Item updated successfully");
          navigate("/profileSales");
        }
      };
      updateProduct();
    }
  };

  const handleEditName = (e) => {
    setCounterName(e.target.value.length);
    setName(e.target.value);
    idProduct > 0 && setIsChange(true);
  };

  const handleEditDescription = (e) => {
    setCounterDescription(e.target.value.length);
    setDescription(e.target.value);
    idProduct > 0 && setIsChange(true);
  };

  const handleImageChange = (value) => {
    if (!Array.isArray(value)) {
      const file = value.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
      idProduct > 0 && setIsChange(true);
    } else {
      const uint8Array = new Uint8Array(value);
      const binaryString = String.fromCharCode.apply(null, uint8Array);
      const base64String = btoa(binaryString);
      const mimeType = "image/jpeg";

      setSelectedImage(`data:${mimeType};base64,${base64String}`);
    }
  };

  const handleEditPrice = (e) => {
    setPrice(e.target.value);
    idProduct > 0 && setIsChange(true);
  };

  const handleEditQuantity = (e) => {
    setQuantity(e.target.value);
    idProduct > 0 && setIsChange(true);
  };

  const handleEditCategory = (value) => {
    setCategoryName(value);
    idProduct > 0 && setIsChange(true);
  };

  return (
    <form className="publishProduct page flex1" onSubmit={handleButton}>
      <h1>{idProduct > 0 ? "Edit Product" : "Publish Product"}</h1>

      <div className="flex1 div">
        <h2>Name</h2>
        <label>
          Clear and concise name; you can also use keywords to improve
          searchability
        </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleEditName}
          maxLength={maxName}
          required
        />
        <span>
          {counterName}/{maxName}
        </span>
      </div>

      <div className="flex1 div">
        <h2>Description</h2>
        <label>
          Detailed description highlighting the product’s most important
          features
        </label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={handleEditDescription}
          maxLength={maxDescription}
          required
        />
        <span>
          {counterDescription}/{maxDescription}
        </span>
      </div>

      <div className="flex1 div">
        <h2>Image</h2>
        <label>Full image of the product in any format</label>
        <div onClick={handleInputImg} className="imgDiv flex1">
          {selectedImage ? (
            <img src={selectedImage} alt="Selected" className="previewImg" />
          ) : (
            <>
              <MdAddPhotoAlternate />
              Select an image
            </>
          )}
        </div>
        <input
          className="imgInput"
          name="image"
          onChange={handleImageChange}
          ref={fileInputRef}
          type="file"
        />
      </div>

      <div className="flex1 div">
        <h2>Price</h2>
        <label>What will be the price of the product?</label>
        <input
          name="price"
          value={price}
          onChange={handleEditPrice}
          type="number"
          required
        />
      </div>

      <div className="flex1 div">
        <h2>Units</h2>
        <label>How many units are available?</label>
        <input
          name="quantity"
          type="number"
          value={quantity}
          onChange={handleEditQuantity}
          min={1}
          required
        />
      </div>

      <div className="flex1 div">
        <h2>Category</h2>
        <label>Which category does the product belong to?</label>
        <Select
          classNamePrefix="select"
          name="category"
          value={categoryName || { value: 1, label: "Sustainable energy" }}
          onChange={handleEditCategory}
          className="selectContainer"
          options={categoriesName.map((c) => {
            return { value: c.id, label: c.name };
          })}
          required
        />
      </div>

      {idProduct > 0 ? (
        isChange && (
          <button type="submit" name="update" className="btn">
            Update Product
          </button>
        )
      ) : (
        <button type="submit" name="publish" className="btn">
          Publish Product
        </button>
      )}
    </form>
  );
}

export default PublishProduct;
