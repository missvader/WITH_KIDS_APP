import React from "react";
import Logo from "../assets/withKidsLogo.png";
import Background from "../assets/backgroundApp.png"
import Spinner from "./Spinner"; 

const Preloader = () => {
  return (
   <div className=" flex flex-col static w-screen h-full mx-auto " id="">
      <img src={Background} alt="background" className="bg-image w-screen fixed bottom-0 opacity-70 md:h-5/6"/>
      <div className="container absolute flex flex-col mx-auto lg:ml-18 ">
      <div className="mx-14 mt-12">
        <p className="text-center text-xl  text-azul uppercase mx-8 font-normal lg:text-2xl">Disfruta de la ciutat amb nens</p>
      </div>
      <div className="content mt-10 mx-10 md:w-1/2 md:mx-auto ">
        <div className="m-5  grid justify-items-center ">
          <img src={Logo} alt="With Kids App Logo" className="logo text-center"/>
        </div>
        <div className="mx-5 mb-5 mt-10 bg-lila p-5 rounded">
          <p className="text-center lg:text-lg text-white uppercase">Descobreix zones de joc, activitats i restaurants</p> 
        </div>
        <div className="mb-5 mx-5 bg-dorado p-5 rounded">
          <p className="text-center lg:text-lg text-white ">TROBA PROPOSTES PER GAUDIR EN FAMILIA</p> 
        </div>
        <Spinner/>
        
      </div> 
      </div>
      
      
   </div>
    
  )
}

export default Preloader;