import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Menu.css";
import ExploreMenu from "../components/ExploreMenu.jsx";
import Header from "../components/Header";

const Menu = () => {
    const [items, setItems] = useState([]);
    const [Quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    useEffect(() => {
      axios
        .get("http://localhost:5000/items")
        .then((items) => setItems(items.data))
        .catch((err) => console.log(err));
    });

    return (
        <>
          <Header />
          <ExploreMenu />
          <div className="menuItems">MENU ITEMS</div>
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
                        <button type="button" >
                          Add To Cart
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

export default Menu;    