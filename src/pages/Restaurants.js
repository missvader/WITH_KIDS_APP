import React from "react";
import {useContext} from "react";
import { DataContext } from "../contexts/DataContext";
import Restaurant from "../components/Restaurant";
import "../App.css"
import Background from "../assets/backgroundApp.png"

const Restaurants = () => {
    const { geoRestaurantes}= useContext(DataContext);
    const dataRest = geoRestaurantes.features;
  
  return (
    <div className="flex flex-col  m-auto static h-screen w-screen md:items-center ">
      <img src={Background} alt="background" className="bg-image w-screen fixed bottom-0 opacity-50 md:h-5/6"/>
      <div className="container absolute flex flex-col mb-10 lg:w-5/6 ">
        <div className="md:w-2/3 md:mx-auto mb-10 lg:grid lg:grid-cols-2 lg:container">
            {
              dataRest?.map((item, index)=> (
                <Restaurant
                  key={index}
                  id={item.properties.id}
                  name={item.properties.name}
                  address = {item.properties.address}
                  phone = {item.properties.phone}
                  web = {item.properties.web}
                  tags = {item.properties.tags}
                  image = {item.properties.image}
                />
              ))
              }
        </div>
      </div>
    </div>
  )
}

export default Restaurants;