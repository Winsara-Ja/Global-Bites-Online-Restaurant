import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext.jsx";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./order.css";

const Order = () => {
  const userID = "65fbed61c95e1f3dcf41d084";
  const [orderItems, setOrderItems] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/orderItems/" + userID)
      .then((orderItems) => {
        setOrderItems(orderItems.data);
        setSearch(orderItems.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const filter = (e) => {
    setSearch(
      orderItems.filter((f) =>
        f.PaymetStatus.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <>
      <Header />
      <div className="searchbox">
        <input
          type="text"
          className="search"
          onChange={filter}
          placeholder="Filter"
        ></input>
      </div>
      <div className="order-header">
        <div className="flex-item">OrderID</div>
        <div className="flex-item">Items</div>
        <div className="flex-item">Order Date</div>
        <div className="flex-item">Price</div>
        <div className="flex-item">Order Status</div>
      </div>
      <div>
        {search.map((orderItem) => {
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
                  {new Date(orderItem.createdAt).toLocaleString()}
                </div>
                <div className="itemquantity">Rs.{orderItem.TotalPrice}</div>
                <div
                  className={`itemprice ${
                    orderItem.PaymetStatus == "Ready"
                      ? "itemprice-green"
                      : orderItem.PaymetStatus == "Deleted"
                      ? "itemprice-red"
                      : "itemprice-yellow"
                  }
                    
                  `}
                >
                  {orderItem.PaymetStatus}
                </div>
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
