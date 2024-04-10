import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext.jsx";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./order.css";

const Order = () => {
  let date;
  const userID = "65fbed61c95e1f3dcf41d084";
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/orderItems/" + userID)
      .then((orderItems) => setOrderItems(orderItems.data))
      .catch((err) => console.log(err));
  });

  return (
    <>
      <Header />
      <div className="order-header">
        <div>OrderID</div>
        <div>Items</div>
        <div>Order Date</div>
        <div>Price</div>
        <div>Payment Status</div>
      </div>
      <div>
        {orderItems.map((orderItem) => {
          return (
            <>
              <div className="order-summary">
                <div className="itemid">{orderItem._id}</div>
                <div className="item-row">
                  {orderItem.ItemData.map((item) => {
                    return (
                      <div className="order-summary">
                        <div className="itemname">{item.ItemName}</div>
                        <div className="itemquantity">{item.Quantity}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="itemdate">
                  {(date = orderItem.createdAt.slice(0, 10))}
                </div>
                <div className="itemquantity">Rs.{orderItem.TotalPrice}</div>
                <div className="itemprice">{orderItem.PaymetStatus}</div>
              </div>
              <hr className="separator"></hr>
            </>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default Order;
