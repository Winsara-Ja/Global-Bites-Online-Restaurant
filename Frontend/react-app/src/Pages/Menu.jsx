import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext.jsx";
import axios from "axios";
import "./Menu.css";
import Header from "../components/Header";
import { toast } from "react-hot-toast";

const Menu = () => {
  const userID = "ja-55476fhfhgvhg";
  const [items, setItems] = useState([]);
  const [Quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/items")
      .then((items) => setItems(items.data))
      .catch((err) => console.log(err));
  });

  const AddToCart = async (item) => {
    const { _id, ItemName, Description, ItemPrice } = item;
    try {
      await axios.post("http://localhost:5000/items", {
        userID,
        _id,
        ItemName,
        Description,
        Quantity,
        ItemPrice,
      });
      if (item.error) {
        toast.error(item.error);
      } else {
        toast.success("Item Added To The Cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="menuItems">MENU ITEMS</div>
      <div>
        {items.map((item) => {
          return (
            <>
              <div className="wrapper">
                <div className="product-info">
                  <div className="product-text">
                    <h1>{item.ItemName}</h1>
                    <h2>{item._id}</h2>
                  </div>
                  <div className="img">
                    <img src="pancakes_img.jpg" />
                  </div>
                  <div className="product-text2">
                    <p>{item.Description}</p>
                  </div>
                  <div className="price">Rs.{item.ItemPrice}</div>
                  <div className="product-price-btn">
                    <button type="button" onClick={() => AddToCart(item)}>
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
};

export default Menu;
