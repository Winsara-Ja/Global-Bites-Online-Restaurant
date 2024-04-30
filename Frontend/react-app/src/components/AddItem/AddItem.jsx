import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Inventory.css";
function AddItem() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    image: "",
    name: "",
    category: "",
    company: "",
    quantity: 0,
    price: 0,
    total: 0,
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Recalculate total whenever quantity or price changes
    if (name === "quantity" || name === "price") {
      calculateTotal({ ...inputs, [name]: value }); // Pass updated inputs object
    }
  };

  const calculateTotal = ({ price, quantity }) => {
    const priceValue = parseFloat(price);
    const quantityValue = parseInt(quantity);
    if (!isNaN(priceValue) && !isNaN(quantityValue)) {
      const total = priceValue * quantityValue;
      setInputs((prevState) => ({
        ...prevState,
        total: total.toFixed(2), // Round to 2 decimal places
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/addInventory", inputs);
      alert("Item Added Successfully");
      navigate("/inventory");
    } catch (error) {
      console.error("Error adding item:", error);
      // Handle error and provide feedback to the user
    }
  };

  return (
    <div>
      <h1 className="item_topic">Add New Item</h1>
      <div className="item_list">
        <form className="addform_invent" onSubmit={handleSubmit}>
          <label className="form_lable">Image URL:</label>
          <br />
          <input
            className="form_inpt"
            type="text"
            name="image"
            value={inputs.image}
            onChange={handleChange}
            required
          />
          <br />
          <label className="form_lable">Name:</label>
          <br />
          <input
            className="form_inpt"
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            required
          />
          <br />
          <label className="form_lable">Category:</label>
          <br />
          <input
            className="form_inpt"
            type="text"
            name="category"
            value={inputs.category}
            onChange={handleChange}
            required
          />
          <br />
          <label className="form_lable">Company:</label>
          <br />
          <input
            className="form_inpt"
            type="text"
            name="company"
            value={inputs.company}
            onChange={handleChange}
            required
          />
          <br />
          <label className="form_lable">Quantity:</label>
          <br />
          <input
            className="form_inpt"
            type="number"
            name="quantity"
            value={inputs.quantity}
            onChange={handleChange}
            required
          />
          <br />
          <label className="form_lable">Price:</label>
          <br />
          <input
            className="form_inpt"
            type="number"
            name="price"
            value={inputs.price}
            onChange={handleChange}
            required
          />
          <br />
          <label className="form_lable">Total:</label>
          <br />
          <input
            className="form_inpt"
            type="text"
            name="total"
            value={inputs.total}
            readOnly
          />
          <br />
          <label className="form_lable">Date:</label>
          <br />
          <input
            className="form_inpt"
            type="date"
            name="date"
            value={inputs.date}
            onChange={handleChange}
            required
          />
          <br /> <br />
          <button type="submit" className="cen_btn">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddItem;
