import React, { useState, useEffect } from 'react';
import "./editItems.css"
import  axios  from 'axios';
//import { ImUpload } from "react-icons/im"
import { useParams, useNavigate } from 'react-router-dom'

const EditItems = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [itemData, setItemData] = useState({
    itemId: "",
    itemName: "",
    Description: "",
    Price: "",
    category: "",
    country: "",
    image: "", 
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/items/' + id)
        setItemData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching item data:', error)
      }
    };
    fetchData();
  }, [id]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setItemData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = async(e)=>{
    e.preventDefault();
    try {

      const response = await axios.put('http://localhost:5000/update/' + id, itemData)
      if(response.data.success){
        navigate('/displayMenu')
        alert(response.data.message);  
      }
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Error updating item. Please try again.');
    }
  };

  return (
    <div className="update-item-container">
      <form onSubmit={handleUpdate}>

        <h2>Edit Item Details</h2>

        <label htmlFor="itemId">Item Id : </label>
        <input type="number" id="itemId" name="itemId" onChange={handleOnChange} value={itemData.itemId} required/>

        <label htmlFor="itemName">Item Name : </label>
        <input type="text" id="itemName" name="itemName" onChange={handleOnChange} value={itemData.itemName} required/>

        <label htmlFor="Price">Item Price : </label>
        <input type="number" id="Price" name="Price" onChange={handleOnChange} value={itemData.Price} required/>

        <label htmlFor="Description">Item Description : </label>
        <input type="text" id="Description" name="Description" onChange={handleOnChange} value={itemData.Description} required/>

        <label htmlFor="category">Item Category:</label>
              <select id="category" name="category" onChange={handleOnChange} value={itemData.category}>
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Pasta">Pasta</option>
                <option value="Dessert">Dessert</option>
                <option value="Bites">Bites</option>
              </select>

            <label htmlFor="country">Item Country:</label>
              <select id="country" name="country" onChange={handleOnChange} value={itemData.country}>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="South Korea">South Korea</option>
                <option value="Thailand">Thailand</option>
                <option value="Italy">Italy</option>
                <option value="Spain">Spain</option>
            </select>

        <div className="food-image-container">
          <img src={`http://localhost:5000/${itemData.image}`} alt="Food" />
        </div>
        <div className="button-container">
          <button className="btn">Update</button>
        </div>
        
      </form>
      
    </div>
  );
}

export default EditItems