import React from "react";
import "./country_list.css";
import { counrty_list } from "../assets/assets";

const Country_list = () => {
  return (
    <div className="counrty-list">
      <h1>Country List</h1>
      <p className="country-list-text">
        This restaurant offers a unique culinary experience by serving a diverse
        range of cuisines from five different countries. Each dish is perfectly
        prepared to capture the flavors and essence of its origin, providing a
        delightful journey for your taste buds. Whether you're craving the bold
        spices of Sri Lankan curry, the comforting warmth of Italian pasta, the
        freshness of Thai soups, the sweet flavors of Korean Jjajangmyeon, or
        the hearty goodness of Spanish Paella Valenciana, Our restaurant has
        something to satisfy every craving.
      </p>
      <div className="country-list-items">
        {counrty_list.map((counrty, index) => {
          return (
            <div key={index} className="list-items">
              <img
                className="country-img"
                src={counrty.counrty_img}
                alt="country-flag"
              />
              <p className="country-name">{counrty.county_name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Country_list;
