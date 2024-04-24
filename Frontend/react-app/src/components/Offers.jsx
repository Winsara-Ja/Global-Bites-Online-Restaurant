import React, { useEffect, useState } from "react";
import "./offers.css";
import axios from "axios";

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
      <div className="offers-tital">Offers</div>
      <div>
        {offers.map((offer) => {
          return(
            <div className="offers">
              <img src={'http://localhost:5000/' + offer.image} alt={offer.offerName}/>
            </div>
          )
        })}
      </div>
    </>
  );
};

export default Offers;
