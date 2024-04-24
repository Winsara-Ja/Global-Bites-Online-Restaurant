import "./addItems.css";
import React, { useState } from "react";
import { ImUpload } from "react-icons/im";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddItems = () => {
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleUploadImage = async (e) => {
    const image = e.target.files[0];
    setImage(image); // Set the file object to the img state directly
  };

  const [formData, setFormData] = useState({
    itemId: "",
    itemName: "",
    Price: "",
    Description: "",
    category: "",
    country: "",
    image: "",
  });

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("itemId", formData.itemId);
    form.append("itemName", formData.itemName);
    form.append("Price", formData.Price);
    form.append("Description", formData.Description);
    form.append("category", formData.category);
    form.append("country", formData.country);
    form.append("image", image); // Append the image file

    try {
      const response = await axios.post("http://localhost:5000/create", form, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure proper content type for file uploads
        },
      });
      navigate("/manager/5");
      console.log(response);
      if (response.data.success) {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="add-item-container">
      <form onSubmit={handleSubmit}>
        <h2>Add Items</h2>

        <label htmlFor="itemId">Item Id : </label>
        <input
          type="number"
          id="itemId"
          name="itemId"
          onChange={handleOnChange}
          value={formData.itemId}
          required
        />

        <label htmlFor="itemName">Item Name : </label>
        <input
          type="text"
          id="itemName"
          name="itemName"
          onChange={handleOnChange}
          value={formData.itemName}
          required
        />

        <label htmlFor="Price">Item Price : </label>
        <input
          type="number"
          id="Price"
          name="Price"
          onChange={handleOnChange}
          value={formData.Price}
          required
        />

        <label htmlFor="Description">Item Description : </label>
        <textarea
          id="Description"
          name="Description"
          onChange={handleOnChange}
          value={formData.Description}
          required
        />

        <label htmlFor="category">Item Category:</label>
        <select
          id="category"
          name="category"
          onChange={handleOnChange}
          value={formData.category}
        >
          <option value="">Select</option>
          <option value="Salads">Salads</option>
          <option value="Appitizers">Appitizers</option>
          <option value="Mains">Mains</option>
          <option value="Sides">Sides</option>
          <option value="Desserts">Desserts</option>
          <option value="Soups">Soups</option>
        </select>

        <label htmlFor="country">Item Country:</label>
        <select
          id="country"
          name="country"
          onChange={handleOnChange}
          value={formData.country}
        >
          <option value="">Select</option>
          <option value="Sri Lanka">Sri Lanka</option>
          <option value="South Korea">South Korea</option>
          <option value="Thailand">Thailand</option>
          <option value="Italy">Italy</option>
          <option value="Spain">Spain</option>
        </select>

        <label htmlFor="image">
          <div className="uploadBox">
            <input
              type="file"
              id="image"
              onChange={handleUploadImage}
              required
            />
            {image ? (
              <img src={URL.createObjectURL(image)} alt="Uploaded Image" />
            ) : (
              <ImUpload />
            )}
          </div>
        </label>
        <div className="food-image-label-container">
          <label className="food-image-label">Food image</label>
        </div>
        <div className="button-container">
          <button className="btn1">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddItems;
