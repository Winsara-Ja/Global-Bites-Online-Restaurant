import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="navigation">
        <Link to="/">
          <div className="name">Global Bites</div>
        </Link>
        <nav className="nav">
          <ul>
            <li>
              <a href="/Menu" className="list-item">
                Menu
              </a>
            </li>
            <li>
              <a href="/Countries" className="list-item">
                Countries
              </a>
            </li>
            <li>
              <a href="/Locations" className="list-item">
                Locations
              </a>
            </li>
            <li>
              <a href="/Offers" className="list-item">
                Offers
              </a>
            </li>
            <li>
              <a href="/AboutUs" className="list-item">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="btn">
                Order Catering
              </a>
            </li>
          </ul>
        </nav>
        <div className="cart-img">
          <Link to="/cart">
            <img src="/cart.png" alt="Cart-Icon" />
          </Link>
        </div>
      </div>
      <div className="text"></div>
    </div>
  );
};

export default Header;
