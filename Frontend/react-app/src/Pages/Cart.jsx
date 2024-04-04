import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext.jsx";
import axios from "axios";
import Header from "../components/Header";
import "./cart.css";

const Cart = () => {
  const { user } = useContext(UserContext);
  const userID = user.id;
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  let Total = 0;
  useEffect(() => {
    axios
      .get("http://localhost:5000/cart")
      .then((cartItems) => setCartItems(cartItems.data))
      .catch((err) => console.log(err));
  });

  const UpdateItemAdd = async (cartItem) => {
    const { _id, Quantity } = cartItem;
    try {
      await axios.put("http://localhost:5000/update/add", {
        _id,
        Quantity,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateItemRemove = async (cartItem) => {
    const { _id, Quantity } = cartItem;
    try {
      await axios.put("http://localhost:5000/update/remove", {
        _id,
        Quantity,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteItem = async (cartItem) => {
    const { _id, Quantity } = cartItem;
    try {
      await axios.delete("http://localhost:5000/item/delete", {
        _id,
        Quantity,
        userID,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const Order = async (cartItems) => {
    try {
      await axios.post("http://localhost:5000/order", {
        userID,
        cartItems,
        Total,
      });
      if (cartItems.error) {
        res.json({
          error: error,
        });
      } else {
        navigate("/order");
      }
    } catch (error) {
      console.log(error);
    }
  };

  cartItems.map(
    ({ ItemPrice, Quantity }) => (Total = Total + ItemPrice * Quantity)
  );

  return (
    <>
      <Header></Header>
      <div className="card">
        <div className="cart">
          <div className="title">
            <div className="row">
              <div className="col">
                <h4>
                  <b>Shopping Cart</b>
                </h4>
              </div>
            </div>
          </div>
          <div className="titles">
            <div className="item-title">Item</div>
            <div className="price-title">Price</div>
            <div className="total-title">Total</div>
          </div>
          <hr />
          <div className="items">
            {cartItems.map((cartItem) => {
              return (
                <>
                  <div className="row main align-items-center">
                    <div className="item-info">
                      <img className="img" src="2.jpg" />
                      <div className="item-column">
                        <div className="item-name">{cartItem.ItemName}</div>
                        <div className="item-description">
                          {cartItem.Description}
                        </div>
                        <div className="item-count">
                          <div className="plus-btn">
                            <button
                              className="plus-btn"
                              onClick={() => UpdateItemAdd(cartItem)}
                            >
                              +
                            </button>
                          </div>
                          <div className="item-quantity">
                            {cartItem.Quantity}
                          </div>
                          <div className="minus-btn">
                            <button
                              className="minus-btn"
                              onClick={() => UpdateItemRemove(cartItem)}
                            >
                              -
                            </button>
                          </div>
                        </div>
                        <button
                          className="delete-btn"
                          onClick={() => DeleteItem(cartItem)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                    <div className="col">Rs.{cartItem.ItemPrice}</div>
                    <div className="total-price">
                      Rs.
                      {cartItem.Quantity * cartItem.ItemPrice}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="summary">
          <div>
            <div className="summary-title">Summary</div>
          </div>
          <hr />
          <div className="row">
            <div className="col text-right">Do you have a Promo Code</div>
            <input className="promo"></input>
            <span>
              <button className="apply">Apply</button>
            </span>
          </div>
          <hr className="hr" />
          <div className="summary-2-part">
            <div className="subtotal">
              <div>Sub Total</div>
              <div>Rs. {Total}</div>
            </div>
            <div className="shipping">
              <div>Shipping</div>
              <div>TBD</div>
            </div>
            <div className="taxes">
              <div>Taxes</div>
              <div>TBD</div>
            </div>
          </div>
          <hr className="hr" />
          <div className="estimated-total">
            <div>ESTIMATED TOTAL</div>
            <div>Rs. {Total}</div>
          </div>
          <hr className="hr" />
          <div className="checkout-btn">
            <button className="btn" onClick={() => Order(cartItems)}>
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
