import React from "react";
import Country_list from "../components/Country_list";
import Slider from "../components/Slider";
import Offers from "../components/Offers";
import AboutUs from "../components/AboutUs";
//import Header from "../components/Header";

const Home = () => {
  return (
    <>
    
      <Slider />
      <Country_list />
      <Offers />
      <AboutUs />
    </>
  );
};

export default Home;
