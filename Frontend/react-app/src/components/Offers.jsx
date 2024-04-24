import React from "react";
import "./offers.css";
import { Link } from "react-router-dom";

const Offers = () => {
  return (
    <>
      <div className="offers-tital">Offers</div>
      <div className="offers">
        <div className="img1">
          <p className="offer-title">New Offers 10% Off</p>
          <p className="offer-info">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto
            facilis expedita repellat rem quasi, obcaecati vitae delectus
            suscipit, amet maiores optio corporis harum ex ea quaerat, alias a
            nemo! Iste.
          </p>
        </div>
        <div className="offers2">
          <div className="img2"></div>
          <Link to="/offers">
            <button className="offers-btn">Check Out More!</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Offers;
