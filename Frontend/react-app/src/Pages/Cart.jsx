import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./cart.css";

const Cart = () => {
  const userID = "65fbed61c95e1f3dcf41d084";
  const UserName = "Jayana";
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  let Total = 0;
  useEffect(() => {
    axios
      .get("http://localhost:5000/cart/" + userID)
      .then((cartItems) => setCartItems(cartItems.data))
      .catch((err) => console.log(err));
  }, [cartItems]);

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
    const { ItemID, _id, Quantity } = cartItem;
    try {
      await axios.put("http://localhost:5000/update/remove", {
        _id,
        Quantity,
        ItemID,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteItem = async (id) => {
    try {
      await axios.delete("http://localhost:5000/item/delete/" + id);
    } catch (error) {
      console.log(error);
    }
  };

  const Order = async (cartItems) => {
    try {
      await axios.post("http://localhost:5000/order", {
        userID,
        UserName,
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
      <Header />
      <div className="card">
        <div className="cart">
          <div className="title">
            <div className="row">
              <div className="col">
                <h4 className="shpooing-cart-title">
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
                      <img
                        className="img"
                        src={"http://localhost:5000/" + cartItem.Img}
                      />
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
                          onClick={() => DeleteItem(cartItem._id)}
                        >
                          Remove
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
          <div className="order-row">
            <div className="summary-title">Summary</div>
            <Link to="/order">
              <div className="my-orders">
                <button className="my-orders-btn">My Orders</button>
              </div>
            </Link>
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
      <Footer />
    </>
  );
};

export default Cart;
