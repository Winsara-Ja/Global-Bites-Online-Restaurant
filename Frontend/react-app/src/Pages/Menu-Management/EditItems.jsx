import React, { useState, useEffect } from 'react';
import "./editItems.css"
import  axios  from 'axios';
import { ImUpload } from "react-icons/im"
import { useParams } from 'react-router-dom'

const EditItems = () => {

  const { id } = useParams();
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    // Fetch the item data based on the ID from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/items/${id}`)
        setItemData(response.data);
      } catch (error) {
        console.error('Error fetching item data:', error)
      }
    };
    fetchData();
  }, [id]);

  const [image, setImage] = useState("") 

  const handleUploadImage = async (e) => {
    const image = e.target.files[0]
    setImage(image); // Set the file object to the img state directly
  };
  const [formData, setFormData] = useState({
    itemId: "",
    itemName: "",
    Description: "",
    Price: "",
    category: "",
    country: "",
    image: "",
    _id: ""
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = async(e)=>{
    e.preventDefault()
    const data = await axios.put("http://localhost:5000/update/", formData)
    if(data.data.success){
      alert(data.data.message)
    }  
  }



  return (
    <div className="updateContainer">
      <form onSubmit={handleUpdate}>
        <label htmlFor="itemId">Item Id : </label>
        <input type="number" id="itemId" name="itemId" onChange={handleOnChange} value={formData.itemId} />

        <label htmlFor="itemName">Item Name : </label>
        <input type="text" id="itemName" name="itemName" onChange={handleOnChange} value={formData.itemName} />

        <label htmlFor="Price">Item Price : </label>
        <input type="number" id="Price" name="Price" onChange={handleOnChange} value={formData.Price} />

        <label htmlFor="Description">Item Description : </label>
        <input type="text" id="Description" name="Description" onChange={handleOnChange} value={formData.Description} />

        <label htmlFor="category">Item Category : </label>
        <input type="text" id="category" name="category" onChange={handleOnChange} value={formData.category} />

        <label htmlFor="country">Item Country : </label>
        <input type="text" id="country" name="country" onChange={handleOnChange} value={formData.country} />

        <label htmlFor="image">
          <div className="uploadBox">
            <input type="file" id="image" onChange={handleUploadImage} />
            {formData.image ? <img src={URL.createObjectURL(formData.image)} alt="Uploaded Image" /> : <ImUpload />}
          </div>
        </label>
        <div className="food-image-label-container">
          <label className="food-image-label">Food image</label>
        </div>

        <button className="btn">Update</button>
      </form>
    </div>
  );
}

export default EditItems