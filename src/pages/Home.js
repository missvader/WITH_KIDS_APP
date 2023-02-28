import React from "react";
import Map from "../components/Map"
import Background from "../assets/backgroundApp.png"

const Home = () => {
  
  return(
    <div className="container h-screen w-screen relative flex ">
      <img src={Background} alt="background" className="bg-image w-screen fixed bottom-0 opacity-50 md:h-5/6"/>
      <Map/>
    </div>
  )
}

export default Home;
