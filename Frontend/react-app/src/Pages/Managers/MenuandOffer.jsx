import React from "react";
import "./MenuandOffer.css";
import { Link } from "react-router-dom";
import ManagerHeader from "./ManagerHeader";
import offer from "../../assets/offer_management.jpeg";
import menu from "../../assets/menu.png";

const MenuandOffer = () => {
  return (
    <>
      <ManagerHeader />
      <div className="menu-offer-container1">
        <div className="menu-container">
          <Link to="/manageMenu">
            <img src={menu} />
          </Link>
          <h3>Menu Management</h3>
        </div>
        <div className="offer-container">
          <Link to="/manageOffer">
            <img src={offer} />
          </Link>
          <h3>Offer Management</h3>
        </div>
      </div>
    </>
  );
};

export default MenuandOffer;
