import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext.jsx";
import axios from "axios";
import Header from "../components/Header";
import "./order.css";

const Order = () => {
  const [orderItems, setOrderItems] = useState([]);
  let Total = 0;
  useEffect(() => {
    axios
      .get("http://localhost:5000/orderItems")
      .then((orderItems) => setOrderItems(orderItems.data))
      .catch((err) => console.log(err));
  });

  orderItems.map(
    ({ ItemPrice, Quantity }) => (Total = Total + ItemPrice * Quantity)
  );
  return (
    <>
      <Header></Header>
      <div className="order-title">OrderPage</div>
      {orderItems.map((orderItem) => {
        return (
          <>
            <div className="order-summary">
              <div className="itemname">{orderItem._id}</div>
              <div className="itemname">{orderItem.createdAt}</div>
              <div className="itemquantity">Rs.{orderItem.TotalPrice}</div>
              <div className="itemprice">{orderItem.PaymetStatus}</div>
            </div>
          </>
        );
      })}
      <div className="total"></div>
    </>
  );
};

export default Order;
