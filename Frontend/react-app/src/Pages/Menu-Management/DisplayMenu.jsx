import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./displayMenu.css"

const DisplayMenu = () => {
    const [items, setItems] = useState([]); 
    const navigate = useNavigate()
    useEffect(() => {
      axios
        .get("http://localhost:5000/items")
        .then((items) => setItems(items.data))
        .catch((err) => console.log(err));
    });

    const handleDelete = async(id) => {
      const data = await axios.delete("http://localhost:5000/delete/" + id)
      
      if(data.data.success){
        alert(data.data.message)
      }
    }
    const HandleEdit = async(id) => {
      navigate(`/updateMenu/${id}`) 
    }

    return (
        <>
          
          <div className="menuItems">MANAGE MENU ITEMS</div>
          <div>
            {items.map((item) => {
              return (
                <>
                  <div className="wrapper">
                    <div className="product-info">
                      <div className="product-text">
                        <h1>{item.itemName}</h1>
                        <h2>{item.itemId}</h2>
                      </div>
                      <div className="img">
                        <img src={'http://localhost:5000/' + item.image} alt={item.itemName}/>
                      </div>
                      <div className="product-text2">
                        <p>{item.Description}</p>
                      </div>
                      <div className="price">Rs.{item.Price}</div>
                      <div className="product-price-btn">
                        <button type="button" onClick={() => HandleEdit(item._id)}>
                          Edit
                        </button>
                        <button type="button" onClick={() => handleDelete(item._id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </>
      );
}

export default DisplayMenu