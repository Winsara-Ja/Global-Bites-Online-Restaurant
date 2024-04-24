import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import "./offers.css";

const Offers = () => {
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/offers")
      .then((offers) => setOffers(offers.data))
      .catch((err) => console.log(err));
  });

  return (
    <>
      <Header />
      <div>
        {offers.map((offer) => {
          return (
            <div className="wrapper1" key={offer.offerId}>
              <div className="offer-info1">
                <div className="image1">
                  <img
                    src={"http://localhost:5000/" + offer.image}
                    alt={offer.itemName}
                  />
                  <div className="overlay">
                    <div className="offer-text">
                      <h1>{offer.offerName}</h1>
                      <h2>use this promo code : {offer.promoCode}</h2>
                      <h2>To get {offer.discount} discount</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Offers;
