import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./managerHeader.css";

const Header = () => {
  const [name, setName] = useState();

  const isActive = (e) => {
    setName(e.target.textContemt);
    console.log(name);
  };
  return (
    <div className="header1">
      <div className="navigation1">
        <Link to="/adminHome">
          <div className="name1">Global Bites</div>
        </Link>
        <nav className="nav1">
          <ul>
            <li>
              <a href="/Menu" className="list-item1">
                Inventory
              </a>
            </li>
            <li>
              <a href="/Countries" className="list-item1">
                Catering
              </a>
            </li>
            <li>
              <a href="/Locations" className="list-item1">
                Locations
              </a>
            </li>
            <li>
              <a href="/Offers" className="list-item1">
                Delivery
              </a>
            </li>
            <li>
              <a href="/Payment" className="list-item1">
                Payment
              </a>
            </li>
            <li>
              <a href="/manager/menuDashboard" className="list-item1">
                Menu & Offers
              </a>
            </li>
            <li>
              <a href="/AboutUs" className="list-item1">
                User
              </a>
            </li>
            <li>
              <a href="/AboutUs" className={"list-item1"}>
                Customer Support
              </a>
            </li>
            <li>
              <a href="/manager/orderdashboard" className={"list-item1"}>
                Order
              </a>
            </li>
          </ul>
        </nav>
        <div className="cart-img1">
          <Link to="/loutout">
            <img src="user-account.png" alt="Cart-Icon" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
