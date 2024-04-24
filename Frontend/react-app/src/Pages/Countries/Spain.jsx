import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";

const Spain = () => {
  
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    
    useEffect(() => {
        const fetchItems = async () => {
          try {
            const response = await axios.get("http://localhost:5000/items");
            setItems(response.data);
          } catch (error) {
            console.error("Error fetching items:", error);
          }
        };
      
        fetchItems();
      }, []);
      
      useEffect(() => {
        try {
          // Filter items by country "Sri Lanka"
          const sriLankaItems = items.filter((item) => item.country === "Spain");
          setFilteredItems(sriLankaItems);
        } catch (error) {
          console.error("Error filtering items:", error);
        }
      }, [items]);
      

  return (
    <>
    <Header/>
    <div className="menuItems">Spain Food Items</div>
        <div className='filtered-items'>
          {filteredItems.map((item, index) => (
            <div key={index} className='item'>
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
                    <button type="button" >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </>  
  )
}

export default Spain