import React from "react";

import  HeroSection from "../components/HeroSection";
import  Header from "../components/Header";
import  Footer from "../components/Footer";
import  Card from "../components/Card";

const Home = () => {
  return (
  <div className="bg-[#1A1A1A] ">
    <Header/>
    <HeroSection/>
    <Card/>
    <Footer/> 
  </div>
  );
};

export default Home;
