import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "./order.css";

const Order = () => {
  const [orderItems, setOrderItems] = useState([]);
  let Total = 0;
  useEffect(() => {
    axios
      .get("http://localhost:5000/cart")
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
              <div className="itemname">{orderItem.ItemName} X </div>
              <div className="itemquantity">{orderItem.Quantity}</div>
              <div className="itemprice">
                {orderItem.Quantity * orderItem.ItemPrice}
              </div>
            </div>
          </>
        );
      })}
      <div className="total">{Total}</div>
      <div className="paynow">
        <button className="pay-btn">Pay Now</button>
      </div>
    </>
  );
};

export default Order;
