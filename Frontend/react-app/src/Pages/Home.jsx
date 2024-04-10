import React from "react";
import Country_list from "../components/Country_list";
import Slider from "../components/Slider";
import Offers from "../components/Offers";
import AboutUs from "../components/AboutUs";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <Slider />
      <Country_list />
      <Offers />
      <AboutUs />
      <Footer />
    </>
  );
};

export default Home;
