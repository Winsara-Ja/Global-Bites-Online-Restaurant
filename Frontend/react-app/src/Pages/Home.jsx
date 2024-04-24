import React from "react";
import Country_list from "../components/Country_list";
import Slider from "../components/Slider";
import AboutUs from "../components/AboutUs";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <Slider />
      <Country_list />
      <AboutUs />
      <Footer />
    </>
  );
};

export default Home;
