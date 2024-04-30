import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateItem() {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/inventory/${id}`);
        setInputs(response.data.item);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Recalculate total whenever quantity or price changes
    if (name === "quantity" || name === "price") {
      calculateTotal({ ...inputs, [name]: value });
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
      // Form validation
      if (inputs.quantity <= 0 || inputs.price <= 0) {
        setError("Quantity and price must be positive numbers.");
        return;
      }
      setError(""); // Clear any previous error

      await axios.put(`http://localhost:5000/updateInventory/${id}`, inputs);
      alert("Item details updated successfully!");
      navigate("/inventory"); // Navigate to the desired route
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item. Please try again.");
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
          Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateItem;
